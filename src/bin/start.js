import IntlPolyfill from 'intl'
import createServer from '../server'
import { env, logger } from '../server/_core'
import db from '../server/models'

(async () => {
  try {
    Intl.NumberFormat = IntlPolyfill.NumberFormat
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

    const PORT = env.PORT || 3000
    const app = await createServer()
    await db.sequelize.sync()
    logger.info('database syncronised', { scope: 'startup' })
    await app.listen(PORT)
    const mode = env.NODE_ENV
    logger.info(`Server listening on ${PORT} in ${mode} mode`, { scope: 'startup' })
  } catch (err) {
    logger.error('Error while starting up server', err)
    process.exit(1)
  }
})()
