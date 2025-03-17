const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    user_id : {
        type : String
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    image : {
        type : String
    },
    category_id : {
        type : String ,
    },
    rating : {
        rate : {
            type : Number
        },
        count : {
            type : Number
        }
    }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product