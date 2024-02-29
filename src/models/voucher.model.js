import { Schema, Types, model } from 'mongoose'

const DOCUMENT_NAME = 'Voucher'
const COLLECTION_NAME = 'Vouchers'
const voucherSchema = new Schema(
  {
    merchant: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['fixed_amount', 'percentage'], default: 'fixed_amount' },
    value: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    max_uses: { type: Number, required: true },
    limit_per_user: { type: Number, default: 1 },
    used_quantity: { type: Number, default: 0 },
    users_used: { type: Array, default: [] },
    min_order_amount: { type: Number, required: true, default: 0 },
    is_active: { type: Boolean, required: true, default: true },
    belongs_to: { type: [Types.ObjectId], ref: 'Product', default: [] },
    belongs_type: { type: String, enum: ['all', 'specific'], required: true },
    // todo: belongs_to_category, applied_locations,
  },
  {
    timestamps: true,
  }
)

export default model(DOCUMENT_NAME, voucherSchema, COLLECTION_NAME)
