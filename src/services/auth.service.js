const User = require("../models/User") 
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const AppError = require("../exception/AppError")
const ErrorCodes = require("../exception/ErrorCodes")
const userService = require("./user.service")
const secretKey = process.env.secretKey
const refreshSecretKey = process.env.refreshSecretKey
class AuthenticationService{

    async authenticate(req){
        const user = await User.findOne({ username: req.body.username })
        if(!user){
            throw new AppError(ErrorCodes.BAD_REQUEST, "User khong ton tai!")
        }
        const auth = await bcrypt.compare(req.body.password, user.password)
        if(!auth){
            throw new AppError(ErrorCodes.UNAUTHORIZED, "Mat khau khong dung!")
        }
        return this.generateToken(user)
    }
    generateToken(user) {
        const accessToken = jwt.sign(
            {
                username : user.username ,
                email : user.email
            },
            secretKey , 
            {
                algorithm : 'HS256',
                expiresIn : '1h'         
            }
        )
        const refreshToken = jwt.sign(
            {
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

    async findOrCreateUser (profile){
        const user = await userService.findUser({email : profile._json.email}) ;
        if(!user){
            const user = await userService.createUser({
                fullname : profile.displayName , 
                email : profile._json.email ,
                type : 'google', 
                type_id : profile.id 
            })
        }
        console.log(user)
        return user ; 
    }
}


module.exports = new AuthenticationService()