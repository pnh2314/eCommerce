import express from 'express'

import userController from '../controllers/user.controller.js'
import asyncHandler from '../middlewares/async-handler.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

router.use(authenticate)

router.get('/vouchers/all', asyncHandler(userController.getAllVouchersForUser))
router.post('/voucher/add/:voucherId', asyncHandler(userController.addVoucher))

export default router
