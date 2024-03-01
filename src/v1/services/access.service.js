// package
import { hash, compare } from 'bcrypt'

// module
import { createUserTokens, getUserTokens, updateUserTokens } from '../models/repositories/token.repo.js'
import { createUser, getUser } from '../models/repositories/user.repo.js'
import { generateAccessToken, generateRefreshToken, generateKeyPairSync } from '../utils/token.util.js'
import { getUserData } from '../utils/index.js'
import { UnauthorizedRequestError, ConflictRequestError } from '../core/error.respone.js'

class AccessService {
  register = async req => {
    try {
      const { username, email, password } = req.body

      const user = await getUser({ username })
      if (user) throw new ConflictRequestError({ message: 'Username already in use!' })

      const hashedPassword = await hash(password, 10)
      const newUser = await createUser({ username, email, password: hashedPassword })
      if (newUser) {
        const userId = newUser['_id']
        const { publicKey, privateKey } = generateKeyPairSync()
        const accessToken = generateAccessToken({ userId, privateKey })
        const refreshToken = generateRefreshToken({ userId, privateKey })

        await createUserTokens({ userId: newUser['_id'], publicKey, privateKey, accessToken, refreshToken })

        return {
          code: 201,
          user: getUserData({ fields: ['_id', 'username', 'email'], object: newUser }),
          accessToken,
          refreshToken,
        }
      }
    } catch (e) {
      throw e
    }
  }

  login = async req => {
    try {
      const { username, password } = req.body
      const user = await getUser({ username })
      if (!user) {
        throw new UnauthorizedRequestError({ message: 'Username or password is incorrect!' })
      }
      const isMatch = compare(password, user.password)
      if (!isMatch) {
        throw new UnauthorizedRequestError({ message: 'Username or password is incorrect!' })
      }

      const userId = user['_id']
      const { accessToken, refreshToken } = await getUserTokens({ userId, select: ['accessToken', 'refreshToken'] })

      return {
        code: 200,
        user: getUserData({ fields: ['_id', 'username'], object: user }),
        accessToken,
        refreshToken,
      }
    } catch (e) {
      throw e
    }
  }

  logout = async req => {
    try {
      // TODO: resign access token and save to database
      let TokenStorage = req.TokenStorage
      const userId = TokenStorage.user.toString()
      const newAccessToken = generateAccessToken({ userId, privateKey: TokenStorage.privateKey })
      TokenStorage = await updateUserTokens({ user: userId }, { accessToken: newAccessToken })
      return {
        code: 200,
      }
    } catch (e) {
      throw e
    }
  }
}

export default new AccessService()
