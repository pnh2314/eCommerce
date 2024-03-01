import { Schema, Types, model } from 'mongoose'

const DOCUMENT_NAME = 'Token'
const COLLECTION_NAME = 'Tokens'

const tokenSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenBlacklist: [String],
    refreshTokenBlacklist: [String],
  },
  { timestamps: true }
)

export default model(DOCUMENT_NAME, tokenSchema, COLLECTION_NAME)
