// import { addVoucher, getAllVouchersForUser } from '../models/repositories/user.repo.js'

class UserService {
  // ! Temporarily ignore the voucher services and inventory services.
  addVoucher = async req => {
    const userId = req.headers['x-client-id']
    const voucherId = req.params.voucherId
    const vouchers = await addVoucher({ userId, voucherId })
    console.log(`UserService - vouchers:`, vouchers)
    return {
      vouchers,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }

  // ! Temporarily ignore the voucher services and inventory services.
  getAllVouchersForUser = async req => {
    const userId = req.headers['x-client-id']
    const userVouchers = await getAllVouchersForUser(userId)
    return {
      vouchers: userVouchers.vouchers,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }
}

export default new UserService()
