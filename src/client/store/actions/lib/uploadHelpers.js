import fetch from 'isomorphic-fetch'

export const uploadFile = ({ file, url }) => {
  const data = new FormData()
  data.append('file', file)

  return fetch(url, {
    method: 'post',
    body: data,
  }).then(res => res.json())
}
