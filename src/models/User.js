const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    fullname : {
        type : String
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"]
    },
    password: {
      type: String,
      required: false,
      minlength: [6, "Password must be at least 6 characters long"]
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
    },
    type: {
      type: String,
      enum: ["local", "google", "facebook"],
    },
    type_id: {
      type: String,
    }
  },
  { timestamps: true } // Tự động thêm createdAt & updatedAt
);

// Tạo model từ schema
const User = mongoose.model("User", userSchema);

module.exports = User;