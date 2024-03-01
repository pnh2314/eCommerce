// module
import { OK, CREATED } from '../core/success.respone.js'
import voucherService from '../services/voucher.service.js'

class VoucherController {
  createVoucher = async (req, res, next) => {
    CREATED.sendResponse({ res, metadata: await voucherService.createVoucher(req) })
  }
  updateVoucher = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await voucherService.updateVoucher(req) })
  }
}

export default new VoucherController()
