import camelcase from 'camelcase'

const getUrl = (entity, payload, constant) => {
  switch (constant) {
    case 'FETCH_ONE':
    case 'UPDATE':
    case 'DELETE':
      return `/${entity.toLowerCase()}/${payload.id}`
    default:
      return `/${entity.toLowerCase()}`
  }
}

export default (entity, actions = []) => {
  return actions.reduce((obj, val) => {
    const CONSTANT = `${entity.toUpperCase()}_${val}`
    return {
      constants: {
        ...obj.constants,
        [CONSTANT]: CONSTANT,
        [`${CONSTANT}_START`]: `${CONSTANT}_START`,
        [`${CONSTANT}_SUCCESS`]: `${CONSTANT}_SUCCESS`,
        [`${CONSTANT}_ERROR`]: `${CONSTANT}_ERROR`,
        [`${CONSTANT}_RETRY`]: `${CONSTANT}_ERROR`,
      },
      actions: {
        ...obj.actions,
        [camelcase(CONSTANT)]: (payload = {}) => ({
          type: CONSTANT,
          payload: {
            url: getUrl(entity, payload, val),
            ...payload,
            body: typeof payload.body === 'object' ? JSON.stringify(payload.body) : payload.body,
          },
        }),
      },
    }
  }, { constants: {}, actions: {} })
}
