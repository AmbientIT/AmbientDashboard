import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: String,
})

export default mongoose.model('User', userSchema)
