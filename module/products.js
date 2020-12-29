const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required : true,
        min : 0
    },
    cata : {
        type: String,
        required : true,
        enum : ['veg','fru','egg','milk','meat']
    }
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;