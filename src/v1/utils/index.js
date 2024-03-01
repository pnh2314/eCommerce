import _ from 'lodash'
const getUserData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields)
}

const removeNullValue = ({ object }) => {
  for (const key in object) {
    if (_.isNull(object[key])) {
      delete object[key]
      continue
    }
    if (_.isObject(object[key])) {
      object[key] = removeNullValue({ object: object[key] })
    }
  }

  return object
}

const updateNestedObject = ({ target, updateFields }) => {
  for (let key in target) {
    if (_.isPlainObject(target[key])) {
      // plain object is object which is created from Object or {}
      target[key] = updateNestedObject({ target: target[key], updateFields: updateFields[key] })
    } else if (key in updateFields) {
      target[key] = updateFields[key]
    }
  }
  return target
}

export { getUserData, removeNullValue, updateNestedObject }
