var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

router.get('/', function(req, res, next){
    Category.find().exec(function (err, doc) {
        if (!err) {
          // res.send(long);
          res.render('them-san-pham', { Category: doc })
        }
      });
})
router.post('/', function(req, res, next){
  //alert('vo toi post nay');
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('soluong', 'soluong is required').notEmpty();
  req.checkBody('gia', 'Gia is required').notEmpty();
  req.checkBody('ngaysx', 'ngaysx is required').notEmpty();
  req.checkBody('baohanh', 'Name is required').notEmpty();
  req.checkBody('mota', 'mota is required').notEmpty();
  req.checkBody('anh', 'anh is required').notEmpty();
  req.checkBody('cate_id', 'Category is required').notEmpty();
  const errors = req.validationErrors()
  //console.log(req.body.anh);
  //var anh = req.body.anh.toString();
  //console.log(anh);
  
  if (errors) {
    console.log(errors)
    // res.render('addProduct', { product, errors })
    res.redirect('/');
  }
  var product = new Product(req.body);
  Product.collection.insertOne(product, function (err, doc) {
    if (!err) {
      //res.send(product);
      res.redirect('/admins');
    }
    else
    {
      console.log('khong thanh cong');
    }
  });
})
module.exports = router;