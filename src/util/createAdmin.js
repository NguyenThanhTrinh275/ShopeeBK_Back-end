const User = require("../models/User");
const bcrypt = require("bcrypt");

const createAdminAccount = async () => {
    try {
        const adminUser = await User.findOne({ role: "admin" });
        if (!adminUser) {
            const hashedPassword = await bcrypt.hash("admin", 10);
            await User.create({
                username: "admin",
                email: "admin@gmail.com",
                password: hashedPassword,
                role: "admin",
            });

            console.log("✅ Admin account created successfully!");
        } else {
            console.log("⚡ Admin account already exists.");
        }
    } catch (error) {
        console.error("❌ Error creating admin account:", error);
    }
};

module.exports = createAdminAccount;
