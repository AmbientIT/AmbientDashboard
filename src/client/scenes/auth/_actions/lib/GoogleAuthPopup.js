// thx to Satellizer ;)
/* eslint guard-for-in:0 */
/* eslint no-restricted-syntax:0 */
/* eslint prefer-const:0 */

const { GOOGLEID, GOOGLEREDIRECTURI, GOOGLESCOPE } = process.env

export default class GoogleAuthPopup {
  constructor(name, clientId = GOOGLEID, redirectUri = GOOGLEREDIRECTURI, scope = GOOGLESCOPE) {
    this.name = name
    this.redirectUri = redirectUri
    this.url = `https://accounts.google.com/o/oauth2/auth?scope=${scope}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
  }

  getFullUrlPath(location) {
    const port = location.port || location.protocol === 'https:' ? '443' : '80'
    const pathName = /^\//.test(location.pathname) ? location.pathname : `/${location.pathname}`
    return `${location.protocol}//${location.hostname}:${port}${pathName}`
  }

  parseQueryString(str = '') {
    return str.split('&').reduce((obj, keyValue) => {
      if (keyValue) {
        let value = keyValue.split('=')
        let key = decodeURIComponent(value[0])
        obj[key] = !!value[1] ? decodeURIComponent(value[1]) : true
      }
      return obj
    }, {})
  }

  stringifyOptions(options) {
    const parts = []
    for (let i in options) {
      parts.push(`${i}=${options[i]}`)
    }
    return parts.join(',')
  }

  show() {
    const options = this.stringifyOptions({
      width: 500,
      height: 500,
      top: window.screenY + ((window.outerHeight - 500) / 2.5),
      left: window.screenX + ((window.outerWidth - 500) / 2),
    })

    const popupName = window.navigator.userAgent.indexOf('CriOS') > -1 ? '_blank' : name
    this.popup = window.open(this.url, popupName, options)

    if (this.popup && this.popup.focus) {
      this.popup.focus()
    }

    return this.polling(this.redirectUri)
      .catch(error => console.error(error))
  }

  polling() {
    return new Promise((resolve, reject) => {
      const redirectUriParser = document.createElement('a')
      redirectUriParser.href = this.redirectUri
      const redirectUriPath = this.getFullUrlPath(redirectUriParser)

      const polling = setInterval(() => {
        if (!this.popup || this.popup.closed || this.popup.closed === undefined) {
          window.clearInterval(polling)
          reject(new Error('The popup window was closed'))
        }

        try {
          const popupWindowPath = this.getFullUrlPath(this.popup.location)
          if (popupWindowPath === redirectUriPath) {
            if (this.popup.location.search || this.popup.location.hash) {
              const query = this.parseQueryString(this.popup.location.search.substring(1).replace(/\/$/, ''))
              const hash = this.parseQueryString(this.popup.location.hash.substring(1).replace(/[\/$]/, ''))
              const params = Object.assign(query, hash)

              if (params.error) {
                reject(new Error(params.error))
              } else {
                resolve(params)
              }
            } else {
              reject(new Error(
                `OAuth redirect has occurred but no query or hash parameters were found.
                They were either not set during the redirect, or were removed—typically by a
                routing library—before Satellizer could read it.`
              ))
            }

            // this.$interval.cancel(polling)
            window.clearInterval(polling)
            this.popup.close()
          }
        } catch (error) {
          // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
          // A hack to get around same-origin security policy errors in IE.
        }
      }, 50)
    })
  }
}
