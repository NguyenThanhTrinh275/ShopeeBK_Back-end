const AppError = require("../exception/AppError")
const ErrorCodes = require("../exception/ErrorCodes")
const jwt = require("jsonwebtoken")
const refreshSecretKey = process.env.refreshSecretKey

function checkRefreshToken(req , res , next) {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        const error = new AppError(ErrorCodes.UNAUTHORIZED, "Refresh token khong ton tai!")
        next(error)
    }
    try {
        const decoded = jwt.verify(refreshToken , refreshSecretKey, {algorithms: 'HS256'})
        req.user = decoded
        next()
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            const error = new AppError(ErrorCodes.UNAUTHORIZED, "Refresh token has expired, please login again");
            next(error)
        }else if(error.name === "JsonWebTokenError"){
            const error = new AppError(ErrorCodes.UNAUTHORIZED, "Invalid token");
            next(error)
        }else{
            const error = new AppError(ErrorCodes.INTERNAL_SERVER_ERROR, "Authentication failed");
            next(error)
        }
    }

}
module.exports = checkRefreshToken
