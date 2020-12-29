const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoose_express_farm', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('mongoose working');
});

const Product = require('./module/products');

const data = [
    {
        name : 'grapes',
        price : 100,
        cata : "fru"
    },
    {
        name : 'apple',
        price : 150,
        cata : 'fru'
    },
    {
        name : 'patato',
        price : 50,
        cata : 'veg'
    },
    {
        name : 'hen eggs',
        price : 10,
        cata : 'egg'
    },
    {
        name : 'cows milk',
        price : 70,
        cata : 'milk'
    },
    {
        name : 'coliflower',
        price : 60,
        cata : 'veg'
    }
];

Product.insertMany(data);