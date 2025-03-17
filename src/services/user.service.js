const AppError = require("../exception/AppError");
const ErrorCodes = require("../exception/ErrorCodes");
const User = require("../models/User");
const bcyrpt = require("bcrypt") 

class UserService {

    async getAllUsers() {
        return await User.find();
    }
    async createUser(user) {
        const { username, email, password } = user;
        if(password) user.password = await this.hashPass(password)

        const exist_name = await this.findUser( { username : username });
        const exist_email = await this.findUser({ email : email });

        if (exist_email || exist_name) {
            throw new AppError(ErrorCodes.BAD_REQUEST, "User ton tai!")
        }
        if(!user.role) user.role = "user"
        if(!user.type) user.type = "local"

        if(!user.username) user.username = 'user_' + Date.now().toString() + Math.floor(Math.random() * 1000)
        return await User.create(user); 
    }
    async updateUser(req){
        let id = req.user._id ; 
        let updateData = req.body ; 
        const user = await User.findByIdAndUpdate(id, updateData) ;
        if(!user){
            throw new AppError(ErrorCodes.BAD_REQUEST, "User khong ton tai hoac UserId khong dung!")
        }
        return user ;
    }

    async deleteUser(req){
        let id = req.user._id ;
        const user = await User.findByIdAndDelete(id) ;
        if(!user){
            throw new AppError(ErrorCodes.BAD_REQUEST, "User khong ton tai hoac UserId khong dung!")
        }
        return user ; 
    }

    async hashPass(password) {
        const pass = await bcyrpt.hash(password, 10)
        return pass ; 
    }
    async findUser(info){
        return await User.findOne(info);
    }
}

module.exports = new UserService();