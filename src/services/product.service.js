const Product = require("../models/Product");
const Category = require("../models/Category");
const userService = require("./user.service");
const AppError = require("../exception/AppError");
const ErrorCodes = require("../exception/ErrorCodes");
class ProductService {
    async createProduct(info, data) {
        if (!Array.isArray(data)) {
            data = [data]; // Chuyển object thành mảng
        }
        let user_id = info._id ;
        data = await Promise.all(data.map( async prod => {
            let category_name = prod.category.toUpperCase() ;
            let category = await Category.findOne({name : category_name}) ;
            console.log(category)
            const user = await userService.findUser({_id : user_id}) ;
            if (!user) {
                throw new AppError(ErrorCodes.BAD_REQUEST, "User khong ton tai!");
            }
            if (!category) {
                category = await Category.create({ name: category_name });
            }
            prod.category_id = category._id ;
            prod.user_id = user_id ;
            return await Product.create(prod);
        }))
        return data ; 
    }
    async getAllCategories(){
        return await Category.find();
    }
}

module.exports = new ProductService();