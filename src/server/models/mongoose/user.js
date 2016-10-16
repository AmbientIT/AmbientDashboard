import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  google: {
    type: String,
  },
  avatar: {
    type: String,
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note',
  }],
})

export default mongoose.model('User', userSchema)
