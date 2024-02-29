import inventory from '../inventory.model.js'

const createInventory = async ({ productId, merchantId, stock }) => {
  return await inventory.create({ productId, merchantId, stock })
}

export { createInventory }
