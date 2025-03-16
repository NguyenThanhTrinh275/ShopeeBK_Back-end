const ProductService = require("../services/product.service");

class ProductController {
    async getAllProductOfSeller(req, res, next) {
        try {
            const products = await ProductService.getAllProductOfSeller(req.params.id);
            res.json(products).status(200);
        } catch (error) {
            next(error);
        }
    }
    async createProduct(req, res, next) {
        try {
            const product = await ProductService.createProduct(req.user, req.body);
            res.json(product).status(200);
        } catch (error) {
            next(error);
        }
    }
    async getAllCategories(req, res, next) {
        try {
            const categories = await ProductService.getAllCategories();
            res.json(categories).status(200);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();