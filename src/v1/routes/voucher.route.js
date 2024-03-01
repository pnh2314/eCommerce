// package
import express from 'express'

// module
import voucherController from '../controllers/voucher.controller.js'
import asyncHandler from '../middlewares/async-handler.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

// --- authentication middleware --- //
router.use(authenticate)

router.post('/create', asyncHandler(voucherController.createVoucher))
router.patch('/update/:voucherId', asyncHandler(voucherController.updateVoucher))

export default router
