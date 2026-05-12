import mongoose from 'mongoose'

const MatHireSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    required: true,
  },

  paymentStatus: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const MatHire =
  mongoose.models.MatHire ||
  mongoose.model('MatHire', MatHireSchema)

export default MatHire