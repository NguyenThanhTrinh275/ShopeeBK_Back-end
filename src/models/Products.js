const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import kết nối DB
const Category = require("./Category");

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER
        } , 
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image : {
            type : DataTypes.STRING
        } , 
        category_id : {
            type : DataTypes.STRING
        },
        user_id : {
            type : DataTypes.STRING
        }
    },
    {
        timestamps: true,
    }
);
Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: "userId",
      as: "owner"
    });
};

Product.associations = () => {
    Product.hasMany(Category , { foreignKey: "category_id" });
}
module.exports = Product