var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');


router.get('/', (req, res, next) => {
  // const products = Product.find({}).exec().then((products) => {
  //   res.render('products', { products: products })
  // }, (err) => {
  //   throw err
  // })
  Product.aggregate([
    {
      $lookup:
      {
        from: "categories",
        localField: "cate_id",
        foreignField: "_id",
        as: "Category"
      }
    }
  ]).exec(function (err, doc){
    if(!err){
      res.render('products', {Product: doc});
    }
  })
});

router.get('/add', (req, res, next) => {
  // const categorys = Category.find({}).exec()
  //   .then((categorys) => { 
  //     res.render('addProduct', { categorys })
  //   })
  //   .catch((err) => {
  //     throw err
  //   })
  Category.find().exec(function (err, doc) {
    if (!err) {
      // res.send(long);
      res.render('addProduct', { Category: doc })
    }
  });
})

router.post('/add', (req, res, next) => {
  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('mota', 'Mo ta is required').notEmpty()
  req.checkBody('gia', 'Gia is required').notEmpty()
  req.checkBody('soluong', 'So luong is required').notEmpty()
  req.checkBody('cate_id', 'Category is required').notEmpty()

  const errors = req.validationErrors()
  // res.send(req.body.category)

  if (errors) {
    console.log(errors)
    // res.render('addProduct', { product, errors })
    res.redirect('/add');
  }

  // const product = (new Product(req.body)).save()
  //   .then((data) => {
  //     res.redirect('/products')
  //   })
  //   .catch((errors) => {
  //     console.log('oops...')
  //   })
  var product = new Product(req.body);
  // var product = new Product({
  //   name: req.body.name,
  //   mota: req.body.mota,
  //   gia: req.body.gia,
  //   soluong: req.body.soluong,
  //   cate_id: req.body.cate_id,
  // });
  Product.collection.insertOne(product, function (err, doc) {
    if (!err) {
      res.redirect('/products/add');
    }
  });
})
// router.get('/show', (req, res, next)=>{
//   const product = Product.find({}).exec()
//   .then((product) => {
//     res.render('products', { product})
//   })
//   .catch((err)=>{
//     throw err
//   })
// })
router.get('/show/:id', (req, res, next) => {
  // const product = Product.findById({ _id: req.params.id })
  //   .populate({
  //     path: 'category',
  //     model: 'Category',
  //     populate: {
  //       path: 'category',
  //       model: 'Product'
  //     }
  //   })
  //   .exec()
  //   .then((product) => {
  //     res.render('everyproduct', { product })
  //   })
  //   .catch((err) => {
  //     throw err
  //   })
  Product.findById({_id: req.params.id}).exec(function(err, doc){
    if(!err){
      res.send(doc);
      //res.render('viewProduct', { Product: doc});
    }
  });
})

module.exports = router;
