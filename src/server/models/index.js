import { getSchema as graffitiSchema } from '@risingstack/graffiti-mongoose'
import { listModules } from '../_core'

export const getModels = async () => await listModules(`${__dirname}/mongoose/*.js`)

export const getSchema = async () => graffitiSchema(await getModels())
