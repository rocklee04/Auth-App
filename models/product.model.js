const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
)

const Product = mongoose.model('product', productSchema)

module.exports = Product;