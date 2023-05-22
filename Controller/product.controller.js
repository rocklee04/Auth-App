const Product = require("../models/product.model")


exports.addProduct = async(req, res) => {

    try{
        const product = new Product(req.body)
        await product.save();
        res.status(200).json({message: "Product added successfully"})
    } catch(err) {
        res.status(400).json({message: err.message})
    }
}

exports.getAllProducts = async(req, res) => {
    try {
        const products = await Product.findOne();
        res.status(200).json(products)
    } catch(err) {
        res.status(400).json({message: err.message}) 
    }
}

exports.delete = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({message: "Product deleted successfully"})
    } catch(err) {
        res.status(400).json({message: err.message}) 
    }
}