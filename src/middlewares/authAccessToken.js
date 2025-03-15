const jwt = require("jsonwebtoken");
const ErrorCodes = require("../exception/ErrorCodes");
const AppError = require("../exception/AppError");
const secretKey = process.env.secretKey

function authAccessToken(req, res, next){
    const authHeader = req.headers["authorization"]
    if(!authHeader){
        const error = new AppError(ErrorCodes.UNAUTHORIZED, "Access token khong ton tai!");
        next(error) 
    }
    const token = authHeader.split(" ")[1]; // Bỏ "Bearer " trong header
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err){
            const error = new AppError(ErrorCodes.UNAUTHORIZED, "Invalid token");
            next(error)
        }
        req.user = decoded; 
        next();
    });
}
module.exports = authAccessToken