const User = require("../models/User") 
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secretKey = process.env.secretKey

class AuthenticationService{

    async authenticate(req){
        const user = await User.findOne({ username: req.body.username })
        if(!user){
            let error = new Error("Khong ton tai user!")
            error.statusCode(400)
            throw error 
        }
        const auth = await bcrypt.compare(req.body.password, user.password)
        if(!auth){
            const error = new Error("Unauthenticated!")
            error.statusCode = 401
            throw error 
        }
        console.log(secretKey)
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            secretKey,
            {   algorithm: 'HS256' , 
                expiresIn: '1h' } 
        );
        return token ; 
    }
    async verify(req){
        if(!req.body.token){
            let error = new Error("Khong co token!")
            error.statusCode(400) 
            throw error 
        }
        const verify = jwt.verify(req.body.token , secretKey, {algorithms: 'HS256'})
        if(verify) return true ;
        return false ; 
    
    }
}


module.exports = new AuthenticationService()