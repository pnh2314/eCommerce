// * No need now

import { Schema, Types, model } from 'mongoose'

const DOCUMENT_NAME = 'Inventory'
const COLLECTION_NAME = 'Inventories'
const inventorySchema = new Schema(
  {
    productId: { type: Types.ObjectId, ref: 'Product' },
    merchantId: { type: Types.ObjectId, ref: 'User' },
    location: { type: String, default: 'unknown' },
    stock: { type: Number, required: true },
    reservation: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
)

export default model(DOCUMENT_NAME, inventorySchema, COLLECTION_NAME)
