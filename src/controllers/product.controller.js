// module
import { OK, CREATED } from '../core/success.respone.js'
import productFactory from '../services/product.service.js'

class ProductController {
  createProduct = async (req, res, next) => {
    CREATED.sendResponse({ res, metadata: await productFactory.createProduct(req) })
  }

  getAllDrafts = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await productFactory.getAllDrafts(req) })
  }

  getAllPublished = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await productFactory.getAllPublished(req) })
  }

  switchState = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await productFactory.switchState(req) })
  }

  updateProduct = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await productFactory.updateProduct(req) })
  }

  getAllProducts = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await productFactory.getAllProducts(req) })
  }

  getProduct = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await productFactory.getProduct(req) })
  }

  // ! Temporarily ignore the voucher service and inventory services.
  getAllVouchersForProduct = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await productFactory.getAllVouchersForProduct(req) })
  }
}

export default new ProductController()
