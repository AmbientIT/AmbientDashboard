import mongoose from 'mongoose'
import { logger } from './logger'

mongoose.Promise = Promise

export const connectDatabase = (uri) => {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => logger.info('Database connection closed.', { scope: 'database' }))
      .once('open', () => resolve(mongoose.connections[0]))

    mongoose.connect(uri)
  })
}
