import httpError from 'http-errors'
import User from '../../models/mongoose/user'
import { createJWT, getGoogleToken, getGoogleProfile } from '../../services/auth'
import isAuthenticated from '../../middlewares/guards/isAuthenticated'

export default router => {
  router.get('/auth/me', isAuthenticated, ctx => ctx.ok(ctx.user))

  router.post('/auth/google', async ctx => {
    const { access_token } = await getGoogleToken({
      code: ctx.request.body.code,
      'client_id': ctx.request.body.clientId, //eslint-disable-line
      'redirect_uri': ctx.request.body.redirectUri, //eslint-disable-line
    })

    const profile = await getGoogleProfile(access_token)

    if (profile.error) {
      throw httpError(401, profile.error.message)
    }

    const userCount = await User.count({})
    let user = await User.findOne({ google: profile.sub })
    if (!user) {
      const newUser = new User({
        google: profile.sub,
        avatar: profile.picture.replace('sz=50', 'sz=200'),
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        role: userCount > 0 ? 'peon' : 'admin',
      })
      user = await newUser.save()
    }
    const token = createJWT(user)
    ctx.ok({ token, user })
  })
}
