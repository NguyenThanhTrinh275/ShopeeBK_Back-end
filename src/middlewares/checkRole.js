const AppError = require("../exception/AppError");
const ErrorCodes = require("../exception/ErrorCodes");

const checkRole = (role) =>(req, res, next) =>{
    if(req.user.role === "admin") return  next();
    if (req.user.role !== role) {
        const error = new AppError(ErrorCodes.UNAUTHORIZED, `You must be an ${role} to access this route`);
        next(error);
    }
    next();
};

module.exports = checkRole;