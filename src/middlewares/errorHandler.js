// copy github : https://github.com/hussaiinkhan/AUTH-CRUD-ExpressJS-Backend/blob/main/middleware/validateTokenHandler.js
//TODO Cần chỉnh lại code, không if else swtich case như này

const {constants} = require('../something_else/constants')
const errorHandler = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({
                title:"Validation Failed",
                message : err.message,
                stackTrace : err.stack
            })
            break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({
                title:"Not Found",
                message : err.message,
                stackTrace : err.stack
                })
                break;
        case constants.FORBIDDEN:
            res.status(statusCode).json({
                title:"Forbidden",
                message : err.message,
                stackTrace : err.stack
                })
                break;
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({
                title:"Unauthorized",
                message : err.message,
                stackTrace : err.stack
                })
                break;
        case constants.SERVER_ERROR:
            res.status(statusCode).json({
                title:"Server Error",
                message : err.message,
                stackTrace : err.stack
                })
                break;
        default:
            res.status(500).json({
                title:"Dont Know",
                message: err.message,
                stackTrace : err.stack
            })
            break;
    }
}

module.exports = errorHandler
