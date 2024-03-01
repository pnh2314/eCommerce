import { Schema, Types, model } from 'mongoose'

const DOCUMENT_NAME = 'Comment'
const COLLECTION_NAME = 'Comments'
const commentSchema = new Schema(
  {
    productId: String,
    userId: String,
    content: { type: String, default: 'text' },
    left: { type: Number, default: 0 },
    right: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

export default model(DOCUMENT_NAME, commentSchema, COLLECTION_NAME)
