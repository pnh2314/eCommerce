// module
import { OK, CREATED } from '../core/success.respone.js'
import orderService from '../services/order.service.js'

class OrderController {
  review = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await orderService.review(req) })
  }
}

export default new OrderController()
