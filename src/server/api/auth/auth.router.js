import createError from 'http-errors'
import User from '../../models/mongoose/user'
import { createJWT, getGoogleToken, getGoogleProfile } from '../../services/auth'
import isAuthenticated from '../../middlewares/guards/isAuthenticated'

export default router => {
  router.get('/auth/me', isAuthenticated, ctx => ctx.ok(ctx.user))

  router.post('/auth/google', async ctx => {
    try {
      const { access_token } = await getGoogleToken({
        code: ctx.request.body.code,
        'client_id': ctx.request.body.clientId, //eslint-disable-line
        'redirect_uri': ctx.request.body.redirectUri, //eslint-disable-line
      })

      const profile = await getGoogleProfile(access_token)

      if (profile.error) {
        throw createError(401, profile.error.message)
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
      ctx.ok({
        token: createJWT(user),
        user,
      })
    } catch (err) {
      console.error(err)
      throw createError(401, err.message)
    }
  })
}
