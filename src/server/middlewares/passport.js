import compose from 'koa-compose'
import convert from 'koa-convert'
import koaSession from 'koa-generic-session'
import MongoStore from 'koa-generic-session-mongo'
import passport from 'koa-passport'
import passportLocal from 'passport-local'
import passportGoogle from 'passport-google-auth'
import User from '../models/mongoose/user.js'

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})

const LocalStrategy = passportLocal.Strategy
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username, password }, done)
}))

const GoogleStrategy = passportGoogle.Strategy
passport.use(new GoogleStrategy({
  clientId: 'your-client-id',
  clientSecret: 'your-secret',
  callbackURL: `http://localhost:${process.env.PORT || 3000}/auth/google/callback`,
},
  (token, tokenSecret, profile, done) => {
    // retrieve user
    User.findOne({ googleId: profile.id }, done)
  }
))

export const passportMiddleware = () => compose([
  passport.initialize(),
  passport.session(),
])

export const sessionMiddleware = () => convert(koaSession({
  store: new MongoStore(),
}))
