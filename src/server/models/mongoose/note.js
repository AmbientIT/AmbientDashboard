import mongoose, { Schema } from 'mongoose'
import autoPopulate from 'mongoose-autopopulate'

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
  ispay: {
    type: Boolean,
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
    autopopulate: true,
  },
})

noteSchema.plugin(autoPopulate)

noteSchema.pre('save', (next, data) => {
  console.log(data, next)
  next()
})

export default mongoose.model('Note', noteSchema)
