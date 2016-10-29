import { Bristol } from 'bristol'
import palin from 'palin'

export const logger = new Bristol()

if (process.env.NODE_ENV === 'production') {
  logger.addTarget('file', { file: `${process.cwd()}/logs/info.log` })
    .withFormatter('commonInfoModel')
    .withLowestSeverity('info')
    .withHighestSeverity('info')

  logger.addTarget('file', { file: `${process.cwd()}/logs/error.log` })
    .withFormatter('commonInfoModel')
    .withLowestSeverity('warn')
} else {
  logger.addTarget('console').withFormatter(palin, {
    rootFolderName: 'Ambient',
  })
}
