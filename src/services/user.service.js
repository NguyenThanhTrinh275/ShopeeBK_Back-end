const User = require("../models/User");

class UserService {

    async getAllUsers() {
        return await User.find();
    }
    async createUser(user) {
        return await User.create(user);
    }
    async updateUser(id,req){
        let idx = req.params.id ; 
        let updateData = req.body ; 
        return await User.findByIdAndUpdate(idx , updateData , {new : true , runValidators : true} ) ; 
    }

    async deleteUser(req){
        let id = req.params.id ; 
        return await User.findByIdAndDelete(id) ; 
    }
}

module.exports = new UserService();