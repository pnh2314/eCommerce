// module
import { OK, CREATED } from '../core/success.respone.js'
import cartService from '../services/cart.service.js'

class CartController {
  addOrUpdate = async (req, res, next) => {
    CREATED.sendResponse({ res, metadata: await cartService.addOrUpdate(req) })
  }
  deleteCartProduct = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await cartService.deleteCartProduct(req) })
  }
  getCart = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await cartService.getCart(req) })
  }
}

export default new CartController()
