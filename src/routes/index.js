// package
import express from 'express'

// module
import checkApiKey from '../middlewares/check-api-key.js'
import checkPermission from '../middlewares/check-permission.js'
import accessRoute from './access.route.js'
import productRoute from './product.route.js'
import voucherRoute from './voucher.route.js'
import userRoute from './user.route.js'
import cartRoute from './cart.route.js'
import orderRoute from './order.route.js'

const router = express.Router()

router.use('/', (req, res, next) => {
  res.end('eCommerce API by Hung Pham')
})

// ----- check api-key ----- //
// router.use(checkApiKey)

// ----- check permission ----- //
// router.use(checkPermission('0000'))

router.use('/v1/api/order', orderRoute)
router.use('/v1/api/cart', cartRoute)
router.use('/v1/api/user', userRoute)
router.use('/v1/api/voucher', voucherRoute)
router.use('/v1/api/product', productRoute)
router.use('/v1/api/access', accessRoute)

export default router
