import localForage from 'localforage'

const localCollections = new Map()

export const getStore = name => {
  if (!localCollections.get(name)) {
    localCollections.set(name, localForage.createInstance({
      name,
    }))
  }
  return localCollections.get(name)
}

export function* removeLocally(entities) {
  const entitiesKeys = Object.keys(entities)
  for (let i = 0; i <= entitiesKeys.length; i += 1) {
    const data = entities[entitiesKeys[i]]
    if (typeof data === 'object') {
      const dataKeys = Object.keys(data)
      for (let j = 0; j <= dataKeys.length; j += 1) {
        if (dataKeys[j]) {
          console.log(entitiesKeys[i], dataKeys[j])
          yield getStore(entitiesKeys[i]).removeItem(dataKeys[j])
        }
      }
    }
  }
}

export function* persistLocally(entities) {
  const entitiesKeys = Object.keys(entities)
  for (let i = 0; i <= entitiesKeys.length; i += 1) {
    const data = entities[entitiesKeys[i]]
    if (typeof data === 'object') {
      const dataKeys = Object.keys(data)
      for (let j = 0; j <= dataKeys.length; j += 1) {
        if (dataKeys[j]) {
          yield getStore(entitiesKeys[i]).setItem(dataKeys[j], data[dataKeys[j]])
        }
      }
    }
  }
}
