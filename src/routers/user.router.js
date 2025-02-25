const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router(); 

router.get("/", async (req, res) => {
    const users = await UserController.getAllUsers(req, res);
    res.json(users);
});

router.post("/", async (req, res) => {
    const user = await UserController.createUser(req, res);
    res.json(user);
});

router.put("/:id", async (req, res) =>{
    let id = req.params.id ; 
    UserController.updateUser(id, req, res) ; 
    console.log("Update Success!")
})
router.delete("/:id", async (req, res) =>{
    UserController.deleteUser(req,res) ; 
    console.log("Delete Success!")
})
module.exports = router