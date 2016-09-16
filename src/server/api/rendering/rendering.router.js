export default (router) => {
  router.get('/*', ctx => ctx.render('index'))
}
