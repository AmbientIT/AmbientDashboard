const requireAllActions = requireContext => {
  const modules = requireContext.keys().map(requireContext)
  let counter = 0
  return requireContext
    .keys()
    .map(modulePath => {
      const splittedModulePath = modulePath.split('/')
      return splittedModulePath[splittedModulePath.length - 1].split('.')[0]
    })
    .reduce((actions, actionName) => {
      actions[actionName] = modules[counter]
      counter++
      return actions
    }, {})
}

export default requireAllActions(require.context('../', true, /^\.\/.*\.actions.js$/))
