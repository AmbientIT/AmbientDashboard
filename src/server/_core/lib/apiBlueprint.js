const defaultMiddleware = {
  findAll: [],
  findOne: [],
  create: [],
  update: [],
  remove: [],
}

export const generateBlueprint = (router, Model, middlewares = defaultMiddleware) => {
  router.get(`/api/${Model.modelName.toLowerCase()}`, ...middlewares.findAll, async ctx => {
    ctx.body = await Model.find(ctx.query.query)
  })

  router.get(`/api/${Model.modelName.toLowerCase()}/:id`, ...middlewares.findOne, async ctx => {
    ctx.body = await Model.findOne({ _id: ctx.params.id })
  })

  router.post(`/api/${Model.modelName.toLowerCase()}`, ...middlewares.create, async ctx => {
    const newEntity = new Model(ctx.body)
    ctx.body = await newEntity.save()
  })

  router.put(`/api/${Model.modelName.toLowerCase()}/:id`, ...middlewares.update, async ctx => {
    ctx.body = await Model.findOneAndUpdate({ _id: ctx.params.id }, ctx.body)
  })

  router.delete(`/api/${Model.modelName.toLowerCase()}/:id`, ...middlewares.remove, async ctx => {
    ctx.body = await Model.remove({ _id: ctx.params.id })
  })
}
