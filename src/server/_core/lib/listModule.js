import glob from 'glob-promise'

export const listModules = async globPattern => {
  const data = await glob(globPattern)
  return data.map(modulePath => require(modulePath).default)
}
