import { normalize } from 'normalizr'
import fetch from 'isomorphic-fetch'
import { userSchema } from '../../store/models'


export const googleAuth = async body => {
  const { GOOGLEID, GOOGLEREDIRECTURI } = process.env

  return await fetch('/auth/google', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      ...body,
      clientId: GOOGLEID,
      redirectUri: GOOGLEREDIRECTURI,
    }),
  })
    .then(res => res.json())
    .then(res => ({
      ...res,
      user: normalize(res.user, userSchema),
    }))
}
