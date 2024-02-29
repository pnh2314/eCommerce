// package
import express from 'express'

// module
import orderController from '../controllers/order.controller.js'
import asyncHandler from '../middlewares/async-handler.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

// --- authentication middleware --- //
router.use(authenticate)

router.get('/review/:cartId', asyncHandler(orderController.review))

export default router
