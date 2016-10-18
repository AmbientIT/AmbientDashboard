import IntlPolyfill from 'intl'
import createServer from '../server'
import { env, logger } from '../server/_core'

(async () => {
  try {
    Intl.NumberFormat = IntlPolyfill.NumberFormat
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

    const PORT = env.PORT || 3000
    const app = await createServer()
    await app.listen(PORT)
    const mode = env.NODE_ENV
    logger.debug(`Server listening on ${PORT} in ${mode} mode`)
  } catch (err) {
    logger.error('Error while starting up server', err)
    process.exit(1)
  }
})()
