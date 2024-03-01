import { updateNestedObject } from '../../utils/index.js'
import { NotFoundError } from '../../core/error.respone.js'
import { productModel, clothing, electronic, furniture } from '../product.model.js'

const createProduct = async ({ model, payload, productId = null }) => {
  if (model === productModel) return await model.create({ ...payload, _id: productId }) // same id as clothes document
  return await model.create(payload) // same id as clothes document
}

const updateProduct = async ({ model, productId, updateFields }) => {
  let target = await model.findById(productId).lean()
  target = updateNestedObject({ target, updateFields })
  return await model.findByIdAndUpdate(productId, target, { new: true }).lean()
}

const getAllDrafts = async ({ filter, limit = 20, skip = 0 }) => {
  return await productModel
    .find(filter)
    // .populate('merchant', 'username')
    .select(['name', '_id'])
    .limit(limit)
    .skip(skip)
    .sort()
    .lean()
}

const getAllPublished = async ({ filter, limit = 20, skip = 0 }) => {
  return await productModel
    .find(filter)
    // .populate('merchant', 'username')
    .select(['name', '_id'])
    .limit(limit)
    .skip(skip)
    .sort()
    .lean()
}

const switchState = async productId => {
  const product = await productModel.findById(productId).lean()
  const newState = product.state === 'drafting' ? 'published' : 'drafting'
  const update = { state: newState }
  const option = { returnDocument: 'after', select: 'name state' }
  return await productModel.findByIdAndUpdate(productId, update, option).lean()
}

const getAllProducts = async () => {
  const filter = { state: 'published' }
  const select = ['thumbnail', 'name', 'price', 'quantity']
  return await productModel.find(filter).select(select).limit(20).skip(0).lean()
}

const getProduct = async productId => {
  const select = ['-__v', '-createdAt', '-updatedAt']
  const filter = { state: 'published', _id: productId }
  return await productModel.findOne(filter).select(select).lean()
}

const getProductById = async productId => {
  return await productModel.findById(productId)
}

export {
  createProduct,
  getAllDrafts,
  getAllPublished,
  switchState,
  getAllProducts,
  getProduct,
  updateProduct,
  getProductById,
}
