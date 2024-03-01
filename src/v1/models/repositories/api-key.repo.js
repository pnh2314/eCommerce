import { randomBytes } from 'crypto'

import ApiKeys from '../api-key.model.js'

const findApiKey = async apiKey => {
  // const pseudoApiKey = await ApiKeys.create({ apiKey: randomBytes(32).toString('hex'), permissions: ['0000'] })
  // console.log(`ApiKeyService - pseudoApiKey:`, pseudoApiKey)
  return await ApiKeys.findOne({ apiKey, status: true }).lean()
}

export default findApiKey
