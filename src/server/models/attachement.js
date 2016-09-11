import mongoose, { Schema } from 'mongoose'
// import Note from './note'

const attachementSchema = new Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  type: {
    type: String,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
  },
})

// attachementSchema.post('save', async doc => {
//   console.log('%s has been saved', doc._id)
//   try {
//     await Note.findByIdAndUpdate(doc.note, {
//       $push: { attachements: doc._id },
//     })
//   } catch (err) {
//     console.error('error', err)
//   }
// })
//
// attachementSchema.post('remove', doc => {
//   console.log('%s has been removed', doc._id)
// })

export default mongoose.model('Attachement', attachementSchema)
