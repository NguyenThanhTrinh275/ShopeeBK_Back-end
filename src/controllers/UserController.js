const UserService = require("../services/user.service");

class UserController {
    async getAllUsers(req, res) {
        const users = await UserService.getAllUsers();
        res.json(users);
    }
    async createUser(req, res) {
        const user = await UserService.createUser(req.body);
        res.json(user);
    }
    async updateUser(id,req, res){
        res.json(UserService.updateUser(id,req, res)) ; 
    }
    async deleteUser(req, res){
        res.json(UserService.deleteUser(req)) ; 
    }
}

module.exports = new UserController();