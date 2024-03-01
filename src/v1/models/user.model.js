import { Schema, Types, model } from 'mongoose'

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    email_verified: { type: Boolean, default: false },
    vouchers: { type: [Types.ObjectId], ref: 'Voucher', default: [] },
    cartId: String,
  },
  {
    timestamps: true,
  }
)

export default model(DOCUMENT_NAME, userSchema, COLLECTION_NAME)
