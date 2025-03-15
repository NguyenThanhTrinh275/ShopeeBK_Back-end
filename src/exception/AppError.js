
class AppError extends Error{
    constructor(errorCodes, customMessage){
        super(customMessage ||errorCodes.message) 
        this.statusCode = errorCodes.code
        Error.captureStackTrace(this, this.constructor)
    }
}
module.exports = AppError