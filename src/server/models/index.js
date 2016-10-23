import { getSchema as graffitiSchema } from '@risingstack/graffiti-mongoose'
import { listModules } from '../_core'

export const getSchema = async () => {
  const models = await listModules(`${__dirname}/mongoose/*.js`)
  return graffitiSchema(models)
}
