const UserService = require("../services/user.service");

class UserController {
    getAllUsers = async (req, res,next) =>{
        try{
            const users = await UserService.getAllUsers();
            res.json(users).status(200);
        }
        catch(error){
            next(error)
        }

    }
    createUser = async (req, res,next) =>{
        try { 
            const user = await UserService.createUser(req.body)
            res.json(user).status(200) ;  
        } catch (error) {
            next(error)
        }            

    }
    updateUser  = async (req, res,next) =>{
        try {
            const user =  await UserService.updateUser(req) 
            res.status(200).json(user)  
        } catch (error) {
            next(error) 
        }

    }
    deleteUser =  async (req, res,next) =>{
        try {
            const user = await UserService.deleteUser(req) 
            res.status(200).json(user) 
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController();