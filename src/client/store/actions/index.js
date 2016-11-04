import actionsBuilder from './lib/actionsBuilder'
// import * as auth from './auth'
const crudActions = [
  'FETCH',
  'FETCH_ONE',
  'CREATE',
  'UPDATE',
  'DELETE',
]

export const note = actionsBuilder('note', crudActions)
export const user = actionsBuilder('user', crudActions)
