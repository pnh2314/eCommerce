// ! Temporarily ignore the voucher service and inventory service

import { BadRequestError, ForbiddenError } from '../core/error.respone.js'
import { getVoucher, createVoucher, updateVoucher } from '../models/repositories/voucher.repo.js'

/**
 * @todo crate voucher [ merchant | admin ]
 * @todo delete voucher [ merchant | admin ]
 * @todo get all vouchers [ user | merchant ]
 * @todo get voucher amount [ user ]
 * @todo cancel voucher [ user ]
 * @todo get vouchers per product [ user ]
 */

class VoucherService {
  // ! Big Error: Merchant can add vouchers to other merchant'products !
  createVoucher = async req => {
    const createFields = req.body
    if (
      new Date() < new Date(createFields.start_date) ||
      new Date() > new Date(createFields.end_date) ||
      new Date(createFields.start_date) >= new Date(createFields.end_date)
    ) {
      throw new BadRequestError({ message: 'Invalid date!' })
    }

    const filter = { code: createFields.code, merchant: createFields.merchant }
    const voucher = await getVoucher({ filter })
    if (voucher) throw new BadRequestError({ message: 'Voucher exists!' })

    const newVoucher = await createVoucher(createFields)
    if (!newVoucher) throw new BadRequestError({ message: 'Could not create voucher!' })

    return {
      newVoucher,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }

  updateVoucher = async req => {
    const voucherId = req.params.voucherId
    const updateFields = req.body
    if (
      new Date() < new Date(updateFields.start_date) ||
      new Date() > new Date(updateFields.end_date) ||
      new Date(updateFields.start_date) >= new Date(updateFields.end_date) ||
      new Date(updateFields.end_date) > new Date()
    ) {
      throw new BadRequestError({ message: 'Invalid date!' })
    }

    // check request which is valid merchant account
    const filter = { _id: voucherId }
    const voucher = await getVoucher({ filter, select: 'merchant' })
    if (voucher.merchant.toString() !== req.headers['x-client-id']) {
      throw new ForbiddenError({ message: 'You are not allowed to update this voucher!' })
    }

    const updatedVoucher = await updateVoucher({ voucherId, updateFields })
    return {
      updatedVoucher,
      accessToken: req.TokenStorage.accessToken,
      refreshToken: req.TokenStorage.refreshToken,
    }
  }
}

export default new VoucherService()
