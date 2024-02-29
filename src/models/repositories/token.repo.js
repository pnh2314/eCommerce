import token from '../token.model.js'

const createUserTokens = async ({ userId, publicKey, privateKey, accessToken, refreshToken }) => {
  return await token.create({
    user: userId,
    publicKey,
    privateKey,
    accessToken,
    refreshToken,
  })
}
const getUserTokens = async ({ userId, select = null }) => {
  return await token.findOne({ user: userId }).select(select)
}

const updateUserTokens = async (filter, update, option = { new: true }) => {
  return await token.findOneAndUpdate(filter, update, option).lean()
}

export { createUserTokens, getUserTokens, updateUserTokens }
