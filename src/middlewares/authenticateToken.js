const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"]
    if(!authHeader){
        const error = new Error("Khong co token") 
        error.statusCode = 401 ; 
        next(error) 
    }
    const token = authHeader.split(" ")[1]; // Bỏ "Bearer " trong header
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            err.message = "Token khong dung!"
            err.statusCode = 403 
            next(err)
        }

        req.user = decoded; // Lưu thông tin user vào request
        next(); // Cho phép request tiếp tục
    });

}
module.exports = authenticateToken