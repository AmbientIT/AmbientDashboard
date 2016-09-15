import User from '../../models/mongoose/user'
import { createJWT, getGoogleToken, getGoogleProfile } from '../../services/auth.service'

export default router => {
  router.post('/auth/google', async ctx => {
    const profile = await getGoogleToken({
      code: ctx.request.body.code,
      'client_id': ctx.request.body.clientId, //eslint-disable-line
      'redirect_uri': ctx.request.body.redirectUri, //eslint-disable-line
    }).then(({ access_token }) => getGoogleProfile(access_token))

    if (profile.error) {
      throw profile.error
    }

    const userCount = await User.count({})
    let user = await User.findOne({ google: profile.sub })
    if (!user) {
      const newUser = new User({
        google: profile.sub,
        avatar: profile.picture.replace('sz=50', 'sz=200'),
        name: profile.name,
        email: profile.email,
        role: userCount > 0 ? 'peon' : 'admin',
      })
      user = await newUser.save()
    }
    ctx.body = {
      token: createJWT(user),
      user,
    }
  })
}
