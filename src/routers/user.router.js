const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router(); 
const checkRole = require("../middlewares/checkRole");
const authAccessToken = require("../middlewares/authAccessToken");


router.get("/all", authAccessToken , checkRole("admin"),  async (req, res,next) => {
    const users = await UserController.getAllUsers(req, res,next);
});
router.get("/me", authAccessToken , async (req, res,next) => {
    const user = await UserController.getMyInfo(req, res,next);
})
router.post("/", async (req, res,next) => {
    const user = await UserController.createUser(req, res,next);
});

router.put("/",authAccessToken , async (req, res,next) =>{
    UserController.updateUser(req, res,next) ; 
    console.log("Update Success User Id : " ,req.params.id)
})
router.delete("/",authAccessToken, async (req, res, next) =>{
    UserController.deleteUser(req, res,next) ; 
    console.log("Delete Success User Id : " ,req.params.id)
})
module.exports = router