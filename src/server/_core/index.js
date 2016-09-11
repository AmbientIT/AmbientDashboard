import yenv from 'yenv'

/**
 * We just export what `yenv()` returns.
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  load: (newEnv) => Object.assign(env, yenv('env.yaml', { env: newEnv })),
  ...yenv(),
}

export * from './configureContainer'
export * from './db'
export * from './logger'