import mongoose from 'mongoose'

const MatHireSchema = new mongoose.Schema({
  sessionId: {
    type: String,
  },

  amount: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    default: 'gbp',
  },

  paymentMethod: {
    type: String,
    enum: ['stripe', 'cash', 'card'],
    required: true,
  },

  paid: {
    type: Boolean,
    default: true,
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