import { OK, CREATED } from '../core/success.respone.js'
import userService from '../services/user.service.js'

class UserController {
  addVoucher = async (req, res, next) => {
    CREATED.sendResponse({ res, metadata: await userService.addVoucher(req) })
  }
  getAllVouchersForUser = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await userService.getAllVouchersForUser(req) })
  }
}

export default new UserController()
