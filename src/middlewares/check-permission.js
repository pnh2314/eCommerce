import _ from 'lodash'

const checkPermission = permissions => {
  return (req, res, next) => {
    // check permissions exist
    if (!req.apiKeyObj.permissions) return res.status(403).json({ msg: 'Permission Denied' })

    // validate permissions
    const isPermissionValid = _.includes(req.apiKeyObj.permissions, permissions)
    if (!isPermissionValid) return res.status(403).json({ msg: 'Permission Denied' })

    next()
  }
}

export default checkPermission
