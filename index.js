const express = require('express');
const app = express();
const methodOverride = require('method-override');

const Product = require('./module/products');

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(methodOverride('_method'));
// app.set('views',path.join(__dirname,'/views'));
// app.set('views', path.join(__dirname,'/views'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoose_express_farm', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('mongoose working');
});

app.get('/', async (req,res)=>{
    const { cata }= req.query;
    console.log('/ get call === ' + req.query);
    console.log(req.query);
    if(cata){
        console.log(cata, '=== ly');
        const all_product = await Product.find({cata});
        res.render('home.ejs', {all_product});
    }else{
        const all_product = await Product.find({});
        // console.log(all_product);
        res.render('home.ejs', {all_product});
    }
});

app.get('/new', async (req,res) => {
    res.render('add_product.ejs');
});

app.post('/', async (req,res) => {
    console.log(req.body);
    console.log('conplete get request');
    const new_product = new Product(req.body);
    await new_product.save();
    res.redirect('/')
});

app.get('/:id/edit', async (req,res) =>{
    const {id} = req.params;
    const current_element = await Product.findById(id);
    console.log(current_element);
    res.render('edit_product.ejs',{current_element});
});

app.put('/:id',async (req,res) => {
    const {id} = req.params;
    const product  = await Product.findByIdAndUpdate(id,req.body);
    res.redirect(`/${product._id}`);
});

app.delete('/:id',async (req,res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/');
});

app.get('/:id',async (req,res) => {
    const {id} = req.params;
    const product_data = await Product.findById(id);
    console.log(product_data);
    res.render('one_product_detail.ejs',{product_data});
});

app.listen(3030,() =>{
    console.log('3030 mongoose express');
});