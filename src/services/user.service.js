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
        if(password)    user.password = await this.hashPass(password)
        
        //! copy chatgpt,
        //  kiem tra xem email hoac username da ton tai chua, trong quá trình làm gặp lỗi null === null ->auto true nên mới copy
        const conditions = [];
        if (email) conditions.push({ email });
        if (username) conditions.push({ username });
        const existingUser = conditions.length > 0 
            ? await User.findOne({ $or: conditions }) 
            : null;


        if (existingUser) {
            throw new AppError(ErrorCodes.BAD_REQUEST, "User ton tai!")
        }
        return await User.create(user) 
    }
    async updateUserById(req){
        let id = req.params.id ; 
        let updateData = req.body ; 
        return await User.findByIdAndUpdate(id , updateData , {new : true , runValidators : true} ) ; 
    }

    async deleteUser(req){
        let id = req.params.id ;
        const user = await User.findById(id) ;
        if(!user){
            throw new AppError(ErrorCodes.BAD_REQUEST, "User ID khong ton tai!")
        }
        return await User.findOneAndDelete(user)
    }

    async hashPass(password) {
        const pass = await bcyrpt.hash(password, 10)
        return pass ; 
    }
    async findUser(info){
        return await User.findOne(info) ;
    }
}

module.exports = new UserService();