const User = require("../models/User") 
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const AppError = require("../exception/AppError")
const ErrorCodes = require("../exception/ErrorCodes")
const secretKey = process.env.secretKey
const refreshSecretKey = process.env.refreshSecretKey
class AuthenticationService{

    async authenticate(info){
        const {phone , username , email} = info

        let user = null 
        if(phone) user = await User.findOne({phone : phone})
        if(username) user = await User.findOne({username : username})
        if(email) user = await User.findOne({email : email})

        if(!user){
            throw new AppError(ErrorCodes.BAD_REQUEST, "User khong ton tai!")
        }
        const auth =  await bcrypt.compare(info.password, user.password)
        if(!auth){
            throw new AppError(ErrorCodes.UNAUTHORIZED, "Mat khau khong dung!")
        }
        return this.generateToken(user)
    }
    generateToken(user) {
        const accessToken = jwt.sign(
            {
                _id : user.id , 
                username : user.username ,
                email : user.email, 
                role : user.role
            },
            secretKey , 
            {
                algorithm : 'HS256',
                expiresIn : '1h'         
            }
        )
        const refreshToken = jwt.sign(
            {
                user_id : user.id ,
                username : user.username ,
                email : user.email
            },
            refreshSecretKey , 
            {
                algorithm : 'HS256',
                expiresIn : '7d'         
            }
        )
        return {accessToken, refreshToken}
    }
    refreshAccessToken(req){
        const {accessToken, refreshToken} = this.generateToken(req.user)
        return accessToken 
    }

}


module.exports = new AuthenticationService()