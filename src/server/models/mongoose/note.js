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
  amount: {
    type: Number,
  },
  done: {
    prop: Boolean,
  },
  currency: {
    type: String,
  },
  attachements: [{
    type: Schema.Types.ObjectId,
    ref: 'Attachement',
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

noteSchema.pre('save', (next, data) => {
  console.log(data, next)
  next()
})

export default mongoose.model('Note', noteSchema)
