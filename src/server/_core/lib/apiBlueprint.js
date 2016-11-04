const defaultMiddleware = {
  findAll: [],
  findOne: [],
  create: [],
  update: [],
  remove: [],
}

export const generateBlueprint = (router, Model, middlewares = defaultMiddleware) => {
  router.get(`/api/${Model.modelName.toLowerCase()}`, ...middlewares.findAll, async ctx => {
    ctx.body = {
      count: await Model.count(),
      data: await Model.find(ctx.request.query.query),
    }
  })

  router.get(`/api/${Model.modelName.toLowerCase()}/:id`, ...middlewares.findOne, async ctx => {
    ctx.body = await Model.findOne({ _id: ctx.params.id })
  })

  router.post(`/api/${Model.modelName.toLowerCase()}`, ...middlewares.create, async ctx => {
    const newEntity = new Model(ctx.request.body)
    ctx.body = await newEntity.save()
  })

  router.put(`/api/${Model.modelName.toLowerCase()}/:id`, ...middlewares.update, async ctx => {
    ctx.body = await Model.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body)
  })

  router.delete(`/api/${Model.modelName.toLowerCase()}/:id`, ...middlewares.remove, async ctx => {
    await Model.remove({ _id: ctx.params.id })
    ctx.body = { _id: ctx.params.id }
  })
}
