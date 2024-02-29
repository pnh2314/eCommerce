import { Schema, Types, model } from 'mongoose'

const DOCUMENT_NAME = 'Cart'
const COLLECTION_NAME = 'Carts'
const cartSchema = new Schema(
  {
    userId: String,
    merchants: [
      {
        products: [],
      },
    ],
    /* 
      merchants: [
        {
          merchantId,
          products [
              {
              name,
              productId,
              quantity,
              price,
            }
          ]
        }
      ]
    */
    total_product: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

export default model(DOCUMENT_NAME, cartSchema, COLLECTION_NAME)
