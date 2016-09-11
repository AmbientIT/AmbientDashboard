import mongoose, { Schema } from 'mongoose'

const noteSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.model('Note', noteSchema)
