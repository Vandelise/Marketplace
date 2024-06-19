import Product from '../models/user.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => { 
    const product = new Product(req.body); 
    try {
        await product.save();
        return res.status(200).json({ 
            message: "Product successfully created!"
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        });
    } 
};

const list = async (req, res) => { 
    try {
        let products = await Product.find(); // Fetch products from the database

        if (req.query.title) {
            const searchQuery = req.query.title.replace(/[\[\]']+/g, ""); 
            const filteredProducts = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            // Return filtered products
            res.json(filteredProducts);
        } else {
            res.json(products);
        }
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};


const productByID = async (req, res, next, id) => { 
    try {
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ 
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve product"
        });
    }
};

const read = (req, res) => {
    return res.json(req.product);
};

const update = async (req, res) => { 
    try {
        let product = req.product;
        product = extend(product, req.body); 
        product.updated = Date.now(); 
        await product.save();
        res.json(product); 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        });
    } 
};

const remove = async (req, res) => { 
    try {
        let product = req.product;
        let deletedProduct = await product.deleteOne(); 
        res.json(deletedProduct); 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        });
    } 
};

const removeAll = async (req, res) => {
    try {
        let result = await Product.deleteMany({});
        res.json({
            message: `${result.deletedCount} products were deleted`
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { create, productByID, read, list, remove, update, removeAll };