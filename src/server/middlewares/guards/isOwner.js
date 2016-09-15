import createError from 'http-errors'
import Note from '../../models/mongoose/note'

export default async (ctx, next) => {
  const note = await Note.findOne({ owner: ctx.user.id })
  if (note.userId !== ctx.user.id) {
    throw createError(401, 'You are not the owner of the resource')
  } else {
    await next()
  }
}
