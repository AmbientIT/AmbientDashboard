// import { getSchema as graffitiSchema } from '@risingstack/graffiti-mongoose'
import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import { env } from '../_core'
// import { listModules } from '../_core'

// const getModels = async () => await listModules(`${__dirname}/mongoose/*.js`)
//
// const getSchema = async () => graffitiSchema(await getModels())

const sequelize = new Sequelize(env.DB)

const schemaPath = `${__dirname}/schema`

const db = fs.readdirSync(schemaPath)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .reduce((myDb, file) => {
    const model = sequelize.import(path.join(schemaPath, file))
    myDb[model.name] = model
    return myDb
  }, { sequelize, Sequelize })

Object
  .keys(db)
  .forEach(modelName => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })

export default db
