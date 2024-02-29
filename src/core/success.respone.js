const StatusCode = {
  OK: 200,
  CREATED: 201,
}

const StatusMessage = {
  OK: 'Success!',
  CREATED: 'Created!',
}

class SuccessResponse {
  static sendResponse({ res, message, statusCode, statusMessage, metadata }) {
    return res.status(statusCode).json({
      message,
      statusMessage,
      metadata,
    })
  }
}

class OK extends SuccessResponse {
  static sendResponse({
    res,
    message = StatusMessage['OK'],
    statusCode = StatusCode['OK'],
    statusMessage = StatusMessage['OK'],
    metadata = {},
  }) {
    console.log(statusCode)
    return res.status(statusCode).json({
      message,
      statusMessage,
      metadata,
    })
  }
}

class CREATED extends SuccessResponse {
  static sendResponse({
    res,
    message = StatusMessage['CREATED'],
    statusCode = StatusCode['CREATED'],
    statusMessage = StatusMessage['CREATED'],
    metadata = {},
  }) {
    return res.status(statusCode).json({
      message,
      statusMessage,
      metadata,
    })
  }
}

export { OK, CREATED }
