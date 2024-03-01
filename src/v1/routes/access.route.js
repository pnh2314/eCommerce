import express from 'express'
const router = express.Router()

import accessController from '../controllers/access.controller.js'
import authenticate from '../middlewares/authenticate.js'
import asyncHandler from '../middlewares/async-handler.js'

router.post('/register', asyncHandler(accessController.register))
router.post('/login', asyncHandler(accessController.login))

// --- authentication middleware --- //
router.use(authenticate)

router.post('/logout', asyncHandler(accessController.logout))

export default router
