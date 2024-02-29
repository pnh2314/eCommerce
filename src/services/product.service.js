// module
import {
  createProduct,
  getAllDrafts,
  getAllPublished,
  switchState,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../models/repositories/product.repo.js'
import { BadRequestError, ForbiddenError, NotFoundError } from '../core/error.respone.js'
import { productModel, clothing, electronic, furniture } from '../models/product.model.js'
import { removeNullValue } from '../utils/index.js'
// import { createInventory } from '../models/repositories/inventory.repo.js'

// factory methods pattern
class ProductFactory {
  classList = {
    Clothes,
    Electronics,
    Furniture,
  }

  // --- post --- //
  createProduct = async req => {
    const category = req.body.category
    const payload = req.body

    const categoryClass = this.classList[category]
    if (!categoryClass) throw new BadRequestError({ message: `Invalid category ${category}` })

    const newProduct = await new categoryClass(payload).createProduct()
    if (!newProduct) throw new BadRequestError({ message: 'Failed to create the product!' })

    return {
      newProduct,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }
  // --- end post --- //

  // --- get --- //
  getAllDrafts = async req => {
    const userId = req.headers['x-client-id']
    const filter = {
      merchant: userId,
      state: 'drafting',
    }
    const drafts = await getAllDrafts({ filter })
    if (!drafts) throw new NotFoundError({ message: 'Drafts not found!' })
    return {
      drafts,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }

  getAllPublished = async req => {
    const userId = req.headers['x-client-id']
    const filter = {
      merchant: userId,
      state: 'published',
    }
    const drafts = await getAllPublished({ filter })
    if (!drafts) throw new NotFoundError({ message: 'Published products not found!' })
    return {
      drafts,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }

  // ! Temporarily ignore the voucher service and inventory services.
  // TODO: ---------------- 00:32 Th4 7 thg 2 2024
  getAllVouchersForProduct = async req => {
    const productId = req.params.productId
    const userId = req.headers['x-client-id']
  }
  // --- end get --- //

  // --- patch --- //
  switchState = async req => {
    const productId = req.params.productId
    const updatedProduct = await switchState(productId)
    if (!updatedProduct) throw new BadRequestError({ message: 'Product state is not changed successfully !' })
    return {
      updatedProduct,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }

  updateProduct = async req => {
    const productId = req.params.productId
    // check if the product belongs to the user who is sending the request
    const prod = await productModel.findById(productId)
    if (prod.merchant.toString() !== req.headers['x-client-id']) {
      throw new ForbiddenError({ message: 'You are not allowed to access this resource!' })
    }

    // rm null value
    const updateFields = removeNullValue({ object: req.body })
    const categoryClass = this.classList[prod.category]
    if (!categoryClass) throw new BadRequestError({ message: `Invalid category ${category}` })

    const updatedProduct = await new categoryClass(updateFields).updateProduct({ productId })
    if (!updatedProduct) throw new BadRequestError({ message: 'Can not update product!' })
    return {
      updatedProduct,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }
  // --- end patch --- //

  // todo: search servie !!

  // --- get (AT & RT are not required) --- //
  getAllProducts = async req => {
    const products = await getAllProducts()
    if (!products) throw new NotFoundError({ message: 'Products not found' })
    return products
  }

  getProduct = async req => {
    const productId = req.params.productId
    const product = await getProduct(productId)
    if (!product) throw new NotFoundError({ message: 'Product not found' })
    return product
  }
  // --- end get (AT & RT are not required) --- //
}

class Product {
  constructor({ merchant, name, thumbnail, description, sold_quantity, stock, price, category, attributes }) {
    this.merchant = merchant
    this.name = name
    this.thumbnail = thumbnail
    this.description = description
    this.sold_quantity = sold_quantity
    this.stock = stock
    this.price = price
    this.category = category
    this.attributes = attributes
  }

  async createProduct({ productId }) {
    const newProduct = await createProduct({ model: productModel, payload: this, productId })
    // if (newProduct) {
    //   // add product stock to inventory collection
    //   await createInventory({
    //     productId: newProduct._id,
    //     merchantId: newProduct.merchant,
    //     stock: newProduct.stock,
    //   })
    // }
    return newProduct
  }

  async updateProduct({ productId }) {
    return await updateProduct({ model: productModel, productId, updateFields: this })
  }
}

class Clothes extends Product {
  async createProduct() {
    const newProductAttributes = await createProduct({ model: clothing, payload: this.attributes })
    if (!newProductAttributes) throw new BadRequestError('create new clothes failed')

    const newProduct = await super.createProduct({ productId: newProductAttributes._id })
    if (!newProduct) throw new BadRequestError('create new product failed')

    return newProduct
  }

  async updateProduct({ productId }) {
    const updateProductAttributes = await updateProduct({
      model: clothing,
      updateFields: this.attributes,
      productId,
    })
    if (!updateProductAttributes) throw new BadRequestError('update product attributes failed!')

    const updatedProduct = await super.updateProduct({ productId })
    if (!updatedProduct) throw new BadRequestError('update product failed!')

    return updatedProduct
  }
}

class Electronics extends Product {
  async createProduct() {
    const newProductAttributes = await createProduct({ model: electronic, payload: this.attributes })
    if (!newProductAttributes) throw new BadRequestError('create new electronics failed')

    const newProduct = await super.createProduct({ productId: newProductAttributes._id })
    if (!newProduct) throw new BadRequestError('create new product failed')

    return newProduct
  }

  async updateProduct({ productId }) {
    const updateProductAttributes = await updateProduct({
      model: electronic,
      updateFields: this.attributes,
      productId,
    })
    if (!updateProductAttributes) throw new BadRequestError('update product attributes failed!')

    const updatedProduct = await super.updateProduct({ productId })
    if (!updatedProduct) throw new BadRequestError('update product failed!')

    return updatedProduct
  }
}

class Furniture extends Product {
  async createProduct() {
    const newProductAttributes = await createProduct({ model: furniture, payload: this.attributes })
    if (!newProductAttributes) throw new BadRequestError('create new furniture failed')

    const newProduct = await super.createProduct({ productId: newProductAttributes._id })
    if (!newProduct) throw new BadRequestError('create new product failed')

    return newProduct
  }

  async updateProduct({ productId }) {
    const updateProductAttributes = await updateProduct({
      model: furniture,
      updateFields: this.attributes,
      productId,
    })
    if (!updateProductAttributes) throw new BadRequestError('update product attributes failed!')

    const updatedProduct = await super.updateProduct({ productId })
    if (!updatedProduct) throw new BadRequestError('update product failed!')

    return updatedProduct
  }
}

export default new ProductFactory()
