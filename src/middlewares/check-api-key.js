import findApiKey from '../models/repositories/api-key.repo.js'

const checkApiKey = async (req, res, next) => {
  try {
    // check apiKey in headers
    const apiKey = req.headers['x-api-key'].toString()
    if (!apiKey) return res.status(403).json({ msg: 'Forbidden Error' })

    // check apiKey in database
    const apiKeyObj = await findApiKey(apiKey)
    if (!apiKeyObj) return res.status(403).json({ msg: 'Forbidden Error' })
    req.apiKeyObj = apiKeyObj

    next()
  } catch (error) {
    console.log(`apiKey - error:`, error)
  }
}

export default checkApiKey
