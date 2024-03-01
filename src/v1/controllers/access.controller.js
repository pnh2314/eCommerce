import accessService from '../services/access.service.js'
import { OK, CREATED } from '../core/success.respone.js'

class AccessController {
  register = async (req, res, next) => {
    CREATED.sendResponse({ res, metadata: await accessService.register(req) })
  }

  login = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await accessService.login(req) })
  }

  logout = async (req, res, next) => {
    OK.sendResponse({ res, metadata: await accessService.logout(req) })
  }
}

export default new AccessController()
