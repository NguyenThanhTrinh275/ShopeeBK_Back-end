const AuthenticationService = require("../services/authentication.service")

class AuthenticationController{
    authenticate = async(req, res, next) =>{
        try {
            const token = await AuthenticationService.authenticate(req)
            res.status(200).json({
                "message" : "Success",
                "token" : token 
            })
        } catch (error) {
            next(error)
        }
    }
    async verify(req, res, next){
        try{
            const check = AuthenticationService.verify(req) 
            res.status(200).json({
                "message" : check ? "true" : "false"
            })
        }
        catch(error){
            next(error) 
        }
    }
}

module.exports = new AuthenticationController 
