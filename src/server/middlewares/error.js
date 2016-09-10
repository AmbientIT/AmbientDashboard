export const errorMiddleware = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error('Error', err)
  }
}
