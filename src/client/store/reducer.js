import { combineReducers } from 'redux'
import apolloClient from './apollo'
import login from './reducers/login'

export default combineReducers({ apollo: apolloClient.reducer(), login })


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
