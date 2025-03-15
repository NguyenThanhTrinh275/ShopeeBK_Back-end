const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router(); 
const authAccessToken = require("../middlewares/authAccessToken");
router.get("/", authAccessToken ,  async (req, res,next) => {
    const users = await UserController.getAllUsers(req, res,next);
    console.log("Get All User Success")
});

router.post("/", async (req, res,next) => {
    const user = await UserController.createUser(req, res,next);
});

router.put("/:id",authAccessToken , async (req, res,next) =>{
    UserController.updateUser(req, res,next) ; 
    console.log("Update Success User Id : " ,req.params.id)
})
router.delete("/:id",authAccessToken, async (req, res, next) =>{
    UserController.deleteUser(req, res,next) ; 
    console.log("Delete Success User Id : " ,req.params.id)
})
module.exports = router