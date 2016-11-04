import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import auth from './reducers/auth'
import note from './reducers/note'
import user from './reducers/user'

export default combineReducers({
  auth,
  note,
  user,
  form,
  routing,
})

// const requireAllReducers = requireContext => {
//   const modules = requireContext.keys().map(requireContext)
//   let counter = 0
//   return requireContext
//     .keys()
//     .map(modulePath => {
//       const splittedModulePath = modulePath.split('/')
//       return splittedModulePath[splittedModulePath.length - 1].split('.')[0]
//     })
//     .reduce((reducers, reducerName) => {
//       reducers[reducerName] = modules[counter].default
//       counter++
//       return reducers
//     }, {})
// }
// Object.assign(
//   requireAllReducers(require.context('../containers', true, /^\.\/.*\.reducer.js$/)),
//   {
//     apollo: apolloClient.reducer(),
//   }
// )
