import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
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
