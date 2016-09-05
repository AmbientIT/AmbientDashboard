import createServer from '../server'
import { env, logger } from '../server/_core'

const PORT = env.PORT || 1338

createServer().then(async app => {
  try {
    await app.listen(PORT)
    const mode = env.NODE_ENV
    logger.debug(`Server listening on ${PORT} in ${mode} mode`)
  } catch (err) {
    logger.error('Error while starting up server', err)
    process.exit(1)
  }
})
