import crypto from 'crypto'

import jwt from 'jsonwebtoken'

const generateAccessToken = ({ userId, privateKey }) => {
  return jwt.sign({ userId }, privateKey, { algorithm: 'RS256', expiresIn: '1d' })
}
const generateRefreshToken = ({ userId, privateKey }) => {
  return jwt.sign({ userId }, privateKey, { algorithm: 'RS256', expiresIn: '365d' })
}

const generateKeyPairSync = () => {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  })
}

export { generateAccessToken, generateRefreshToken, generateKeyPairSync }
