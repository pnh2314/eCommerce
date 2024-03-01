// packages
import _ from 'lodash'

// module
import cartModel from '../cart.model.js'

const createCart = async userId => {
  return await cartModel.create({ userId })
}

const getCart = async userId => {
  return await cartModel.findOne({ userId })
}

const addOrUpdate = async ({ filter, update, options }) => {
  return await cartModel.findOneAndUpdate(filter, update, options)
}

const deleteCartProduct = async ({ filter, update, options }) => {
  return await cartModel.findOneAndUpdate(filter, update, options)
}

export { createCart, getCart, addOrUpdate, deleteCartProduct }
