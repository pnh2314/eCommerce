// package
import express from 'express'

// module
import productController from '../controllers/product.controller.js'
import asyncHandler from '../middlewares/async-handler.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

router.get('/all', asyncHandler(productController.getAllProducts))
router.get('/:productId', asyncHandler(productController.getProduct))

// --- authentication middleware --- //
router.use(authenticate)

router.get('/vouchers/all/:productId', asyncHandler(productController.getAllVouchersForProduct))
router.get('/drafts/all', asyncHandler(productController.getAllDrafts))
router.get('/published/all', asyncHandler(productController.getAllPublished))
router.post('/create', asyncHandler(productController.createProduct))
router.patch('/switch-state/:productId', asyncHandler(productController.switchState))
router.patch('/update/:productId', asyncHandler(productController.updateProduct))

export default router
