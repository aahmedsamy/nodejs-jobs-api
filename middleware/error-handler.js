const statusCodes = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later."
    }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
        customError.statusCode = statusCodes.BAD_REQUEST
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = statusCodes.BAD_REQUEST
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id: ${err.value}`
        customError.statusCode = statusCodes.NOT_FOUND
    }

    return res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = errorHandlerMiddleware
