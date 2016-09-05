import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
})

export default mongoose.model('User', userSchema)
