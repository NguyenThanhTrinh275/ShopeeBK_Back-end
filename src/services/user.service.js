const User = require("../models/User");
const bcyrpt = require("bcrypt") 

class UserService {

    async getAllUsers() {
        return await User.find();
    }
    async createUser(user) {
        const { username, email, password } = user;
        user.password = await this.hashPass(password)
        // Kiểm tra xem user có tồn tại không
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            const error = new Error("Username hoặc email đã tồn tại!"); // Ném lỗi ra ngoài
            error.statusCode = 400 ; 
            throw error 
        }
        return await User.create(user) ; 

    }
    async updateUser(req){
        let id = req.params.id ; 
        let updateData = req.body ; 
        return await User.findByIdAndUpdate(id , updateData , {new : true , runValidators : true} ) ; 
    }

    async deleteUser(req){
        let id = req.params.id ; 
        return await User.findByIdAndDelete(id) ; 
    }

    async hashPass(password) {
        const pass = await bcyrpt.hash(password, 10)
        return pass ; 
    }
}

module.exports = new UserService();