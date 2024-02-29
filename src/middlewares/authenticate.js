// package
import jwt from 'jsonwebtoken'

// module
import { UnauthorizedRequestError, ForbiddenError } from '../core/error.respone.js'
import { getUserTokens, updateUserTokens } from '../models/repositories/token.repo.js'
import asyncHandler from './async-handler.js'
import { generateAccessToken, generateRefreshToken } from '../utils/token.util.js'

const authenticate = asyncHandler(async (req, res, next) => {
  const userId = req.headers['x-client-id']
  if (!userId) throw new UnauthorizedRequestError({ message: 'Invalid Request!' })

  const accessToken = req.headers['authorization'].split(' ')[1]
  const refreshToken = req.headers['refresh-token']

  let TokenStorage = await getUserTokens({ userId })

  // check blacklist
  if (
    TokenStorage.accessTokenBlacklist.includes(accessToken) ||
    TokenStorage.refreshTokenBlacklist.includes(refreshToken)
  ) {
    // todo: logout all clients
    const newAccessToken = generateAccessToken({ userId, privateKey: TokenStorage.privateKey })
    const newRefreshToken = generateRefreshToken({ userId, privateKey: TokenStorage.privateKey })
    TokenStorage.accessTokenBlacklist = []
    TokenStorage.refreshTokenBlacklist = []
    await TokenStorage.save()
    TokenStorage = await updateUserTokens(
      { user: userId },
      { accessToken: newAccessToken, refreshToken: newRefreshToken }
    )
    throw new ForbiddenError({ message: 'Something went wrong, please relogin!' })
  }

  // validate token in database
  if (TokenStorage.accessToken !== accessToken || TokenStorage.refreshToken !== refreshToken) {
    throw new UnauthorizedRequestError({ message: 'Invalid Request!' })
  }

  try {
    jwt.verify(accessToken, TokenStorage.privateKey)
    req.TokenStorage = TokenStorage
    next()
  } catch (e) {
    // AT is expired
    jwt.verify(refreshToken, TokenStorage.privateKey, async (e, decoded) => {
      // both AT and RT are expired
      if (e) {
        TokenStorage.refreshTokenBlacklist.push(refreshToken) // add to the RT_blacklist
        TokenStorage.accessTokenBlacklist.push(accessToken) // add to the AT_blacklist
        await TokenStorage.save()

        const newAccessToken = generateAccessToken({ userId, privateKey: TokenStorage.privateKey })
        const newRefreshToken = generateRefreshToken({ userId, privateKey: TokenStorage.privateKey })
        TokenStorage = await updateUserTokens(
          { user: userId },
          { accessToken: newAccessToken, refreshToken: newRefreshToken }
        )
        req.TokenStorage = TokenStorage
        next()
      } else {
        // just AT is expired
        TokenStorage.accessTokenBlacklist.push(accessToken) // add to the AT_blacklist
        await TokenStorage.save()

        const newAccessToken = generateAccessToken({ userId, privateKey: TokenStorage.privateKey })
        TokenStorage = await updateUserTokens({ user: userId }, { accessToken: newAccessToken })
        req.TokenStorage = TokenStorage
        next()
      }
    })
  }
})

export default authenticate
