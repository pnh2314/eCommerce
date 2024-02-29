import userModel from '../user.model.js'
import { createCart } from './cart.repo.js'

const createUser = async ({ username, email, password, status = 'active' }) => {
  const newUser = await userModel.create({ username, email, password, status })
  const userCart = await createCart(newUser['_id'].toString())
  return await userModel.findByIdAndUpdate(
    newUser._id,
    { cart: userCart['_id'].toString() },
    { returnDocument: 'after' }
  )
}

const getUser = async ({ username, select = ['username', 'email', 'password'] }) => {
  return await userModel.findOne({ username }).select(select)
}

// const addVoucher = async ({ userId, voucherId }) => {
//   const user = await userModel.findById(userId).select('vouchers')
//   user.vouchers.push(voucherId)
//   await user.save()
//   return user.vouchers
// }

// const getAllVouchersForUser = async userId => {
//   return await userModel
//     .findById(userId)
//     .select(['username', '-_id'])
//     .populate('vouchers', 'voucher_code voucher_is_active')
//     .lean()
// }

export { createUser, getUser }
