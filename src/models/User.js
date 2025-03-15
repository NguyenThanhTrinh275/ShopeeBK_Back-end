const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import kết nối DB
const Product = require("./products");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      trim : true, 
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      trim : true,
      allowNull: false,
      defaultValue : () => { return 'user' + Date.now().toLocaleString() + Math.floor(Math.random() * 1000) }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue : () => {
        return getRandomString(8);
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image :{
        type : DataTypes.STRING
    },
    from_where :{
        type : DataTypes.STRING , 
        enum : ['local' , 'google' , 'facebook']
    }, 
    role :{
        type : DataTypes.STRING ,        
        enum : ['user' , 'seller','admin'] , 
        defaultValue : 'user', 
    }
  },
  {
    tableName: "users", // Tên bảng trong DB
    timestamps: true,   // Bật createdAt, updatedAt
  }
);
User.associations = () => {
  User.hasMany(Product, { foreignKey: "user_id" });
}
module.exports = User;
