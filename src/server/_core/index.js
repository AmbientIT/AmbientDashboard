import yenv from 'yenv'
import { Bristol } from 'bristol'
import palin from 'palin'

export const logger = new Bristol()
logger.addTarget('console').withFormatter(palin, {
  rootFolderName: 'Ambient', // Edit this to match your actual foldername
})

/**
 * We just export what `yenv()` returns.
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  load: (newEnv) => Object.assign(env, yenv('env.yaml', { env: newEnv })),
  ...yenv(),
}

export * from './configureContainer'
