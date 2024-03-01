import voucherModel from '../voucher.model.js'

const getVoucher = async ({ filter, select = undefined, options = undefined }) => {
  return await voucherModel.findOne(filter, select, options)
}

const createVoucher = async createFields => {
  return await voucherModel.create(createFields)
}

const updateVoucher = async ({ voucherId, updateFields }) => {
  return await voucherModel
    .findByIdAndUpdate(voucherId, updateFields, { returnDocument: 'after' })
    .select(['-createdAt', '-updatedAt', '-__v'])
    .lean()
}

export { getVoucher, createVoucher, updateVoucher }
