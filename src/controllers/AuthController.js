const AuthenticationService = require("../services/auth.service")

class AuthController{
    login = async(req, res, next) =>{
        try {
            const {accessToken , refreshToken} = await AuthenticationService.authenticate(req)
            res.cookie("refreshToken" , refreshToken  , {httpOnly : true , secure:true})
            res.status(200).json({
                "message" : "Success",
                "token" : accessToken 
            })

        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req, res, next){
        res.status(200).json({
            "message" : "Success",
            "token" : await AuthenticationService.refreshAccessToken(req) ,
            "user" : req.user
        })
    }
}

module.exports = new AuthController() 
