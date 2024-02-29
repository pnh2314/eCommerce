import { BadRequestError, ForbiddenError, NotFoundError } from '../core/error.respone.js'
import { getCart } from '../models/repositories/cart.repo.js'
import { getProductById } from '../models/repositories/product.repo.js'

class OrderService {
  /*
    orders: [
      {
        merchantId,
        products: [
          {
            productId,
            unit_price, ex: 100
            quantity, ex: 2
          }, 
          {
            productId, 
            unit_price, ex: 200
            quantity, ex: 4
          }
        ]
      },
      {
        merchantId,
        products: [
          {
            productId, 
            unit_price, ex: 500
            quantity, ex: 6
          }
        ]
      }
    ]
  */

  review = async req => {
    const cartId = req.params.cartId
    const orders = req.body
    const userId = req.headers['x-client-id']
    const foundCart = await getCart(userId)
    if (!foundCart) throw new NotFoundError({ message: 'Cart not found' })
    if (cartId !== foundCart['_id'].toString()) throw new ForbiddenError({ message: 'Not your cart' })

    const products = orders.flatMap(merchant => merchant.products)

    let totalPrice = 0
    for (const p of products) {
      const foundProduct = await getProductById(p.productId)
      if (!foundProduct) throw new NotFoundError({ message: 'Product not found' })
      if (foundProduct.stock < p.quantity || foundProduct.price !== p.unit_price)
        throw new BadRequestError({ message: 'Error occurred, please try again' })
      totalPrice += p.unit_price * p.quantity
    }

    const shipFee = Math.round(Math.random() * 100)

    return {
      order: {
        totalPrice,
        shipFee,
        finalPrice: totalPrice + shipFee,
      },
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refershToken,
    }
  }
}

export default new OrderService()
