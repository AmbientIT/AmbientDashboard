import fs from 'fs'
import path from 'path'
import { getSchema } from '@risingstack/graffiti-mongoose'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'
import { models } from '../src/server/models'

const schema = getSchema(models)
// Save JSON of full schema introspection for Babel Relay Plugin to use
const buildJsonSchema = async () => {
  try {
    const result = await graphql(schema, introspectionQuery)
    fs.writeFileSync(
      path.join(__dirname, '../build/schema.json'),
      JSON.stringify(result, null, 2)
    )
  } catch (err) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(err, null, 2)
    )
  }
}

buildJsonSchema()
