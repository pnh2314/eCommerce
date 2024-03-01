const StatusCode = {
  BADREQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  CONFLICT: 409,
}

const StatusMessage = {
  BADREQUEST: 'Bad Request Error',
  UNAUTHORIZED: 'Unauthorized Request Error',
  FORBIDDEN: 'Forbidden Request Error',
  NOTFOUND: 'Not Found Error',
  CONFLICT: 'Conflict Request Error',
}

class ErrorRespone extends Error {
  constructor({ message, statusCode }) {
    super(message)
    this.statusCode = statusCode
  }
}

class BadRequestError extends ErrorRespone {
  constructor({ message = StatusMessage['BADREQUEST'], statusCode = StatusCode['BADREQUEST'] }) {
    super({ message, statusCode })
  }
}

class UnauthorizedRequestError extends ErrorRespone {
  constructor({ message = StatusMessage['UNAUTHORIZED'], statusCode = StatusCode['UNAUTHORIZED'] }) {
    super({ message, statusCode })
  }
}

class ForbiddenError extends ErrorRespone {
  constructor({ message = StatusMessage['FORBIDDEN'], statusCode = StatusCode['FORBIDDEN'] }) {
    super({ message, statusCode })
  }
}

class NotFoundError extends ErrorRespone {
  constructor({ message = StatusMessage['NOTFOUND'], statusCode = StatusCode['NOTFOUND'] }) {
    super({ message, statusCode })
  }
}

class ConflictRequestError extends ErrorRespone {
  constructor({ message = StatusMessage['CONFLICT'], statusCode = StatusCode['CONFLICT'] }) {
    super({ message, statusCode })
  }
}

export { BadRequestError, UnauthorizedRequestError, ForbiddenError, NotFoundError, ConflictRequestError }
