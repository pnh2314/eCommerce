import _ from 'lodash'

import { getCart, addOrUpdate, deleteCartProduct } from '../models/repositories/cart.repo.js'
import { BadRequestError } from '../core/error.respone.js'

/**
 * @todo add product to cart
 * @todo decrease/increase quantity by one
 * @todo get cart products
 * @todo del cart products
 */

class CartService {
  addOrUpdate = async req => {
    const userId = req.headers['x-client-id']
    const merchant = req.body

    // check người bán --> check sản phẩm
    let userCart = await getCart(userId)
    const merchantIndex = userCart.merchants.findIndex(m => m['_id'].toString() === merchant['_id'])
    if (merchantIndex === -1) {
      const filter = { userId },
        update = { $addToSet: { merchants: merchant } },
        options = { upsert: true, returnDocument: 'after' }
      userCart = await addOrUpdate({ filter, update, options })
    } else {
      for (const product of merchant.products) {
        const productIndex = userCart.merchants[merchantIndex].products.findIndex(
          p => p.productId === product.productId
        )
        if (productIndex === -1) {
          const filter = { userId, 'merchants._id': merchant['_id'] },
            update = { $addToSet: { 'merchants.$.products': product } },
            options = { upsert: true, returnDocument: 'after' }
          userCart = await addOrUpdate({ filter, update, options })
          await userCart.save()
        } else {
          const filter = {
              userId,
              'merchants.products.productId': product.productId,
            },
            update = {
              $inc: {
                'merchants.$[m].products.$[p].quantity': product.quantity,
                'merchants.$[m].products.$[p].price': product.price,
              },
            },
            options = {
              upsert: true,
              returnDocument: 'after',
              arrayFilters: [{ 'm._id': merchant['_id'] }, { 'p.productId': product.productId }],
            }
          userCart = await addOrUpdate({ filter, update, options })
        }
      }
    }

    let uniqueProductCount = 0
    userCart.merchants.forEach(m => {
      uniqueProductCount += m.products.length
    })
    userCart.total_product = uniqueProductCount
    await userCart.save()

    if (!userCart) throw new BadRequestError({ message: 'Can not add to cart' })
    return {
      userCart,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }

  deleteCartProduct = async req => {
    const userId = req.headers['x-client-id']
    const productId = req.params.productId

    const userCart = await getCart(userId)
    _.forEach(userCart.merchants, m => {
      _.filter(m.products, p => p.productId !== productId)
    })
    await userCart.save()

    return {
      userCart,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }

  getCart = async req => {
    const userId = req.headers['x-client-id']
    const userCart = await getCart(userId)
    return {
      userCart,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }
}

export default new CartService()
