import yenv from 'yenv'

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  load: (newEnv) => Object.assign(env, yenv('env.yaml', { env: newEnv })),
  ...yenv(),
}
