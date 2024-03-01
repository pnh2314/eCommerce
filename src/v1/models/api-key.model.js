import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'

const apiKeySchema = new Schema(
  {
    apiKey: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      enum: ['0000', '1111', '2222'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default model(DOCUMENT_NAME, apiKeySchema, COLLECTION_NAME)
