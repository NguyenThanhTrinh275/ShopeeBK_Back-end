const express = require("express");
const router = express.Router(); 
const productController = require("../controllers/ProductController");
const authAccessToken = require("../middlewares/authAccessToken");
const checkRole = require("../middlewares/checkRole");

router.get("/all/me", authAccessToken,async (req, res, next) => {
    const products = await productController.getAllProductOfSeller(req, res, next);
});

router.post("/create",authAccessToken,checkRole("seller") , authAccessToken,async (req, res, next) => {
    const product = await productController.createProduct(req, res, next);
})

module.exports = router