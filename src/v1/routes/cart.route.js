// package
import express from 'express'

// module
import cartController from '../controllers/cart.controller.js'
import asyncHandler from '../middlewares/async-handler.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

// --- authentication middleware --- //
router.use(authenticate)

router.get('/', asyncHandler(cartController.getCart))
router.post('/add-product', asyncHandler(cartController.addOrUpdate))
router.post('/delete/:productId', asyncHandler(cartController.deleteCartProduct))

export default router
