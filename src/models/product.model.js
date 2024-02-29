import { Schema, Types, model } from 'mongoose'

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'
const productSchema = new Schema(
  {
    merchant: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String },
    sold_quantity: { type: Number, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Clothes', 'Electronics', 'Furniture'],
    },
    attributes: { type: Schema.Types.Mixed, required: true },
    state: {
      type: String,
      required: true,
      enum: ['drafting', 'published'],
      default: 'drafting',
    },
  },
  {
    timestamps: true,
  }
)

const clothingSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String, required: true },
    material: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const electronicSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String, required: true },
    material: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const furnitureSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String, required: true },
    material: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const productModel = model(DOCUMENT_NAME, productSchema, COLLECTION_NAME)
const clothing = model('Clothing', clothingSchema, 'Clothes')
const electronic = model('Electronic', electronicSchema, 'Electronics')
const furniture = model('Furniture', furnitureSchema, 'Furniture')

export { productModel, clothing, electronic, furniture }
