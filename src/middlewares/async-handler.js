// alternative for try-catch
// use for middlewares
const asyncHandler = func => {
  return (req, res, next) => {
    func(req, res, next).catch(e => next(e)) // executed when the endpoint is called
  }
}

export default asyncHandler
