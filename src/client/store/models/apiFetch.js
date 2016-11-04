import { normalize } from 'normalizr'
import fetch from 'isomorphic-fetch'
import config from '../../lib/config'

export default async ({ headers, url, ...other }, schema) => {
  const httpOptions = {
    ...other,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
  const response = await fetch(`${config.APIURL}${url}`, httpOptions)
    .then(res => res.json())

  const data = normalize(response.data || response, schema)
  return !!response.data ? { ...response, data } : { ...data }
}
