var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

router.get('/', function(req, res, next){
    Category.find().exec(function (err, doc) {
        if (!err) {
          Product.find().exec(function(er1, doc1){
            if(!er1)
            {
              res.render('homePageAdmin', { Category: doc, Product: doc1 });
            }
          })
            //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa');
          // res.send(long);
          //res.render('homePageAdmin', { Category: doc })
        }
      });
})
router.get('/timProducts/:id', function(req, res, next){
  Category.find().exec(function (err1, doc1) { 
    if(!err1)
    {
        Product.find({cate_id: req.params.id}).exec(function(err2, doc2){
            //res.send(doc2);
            if(!err2)
            {
                res.render('homePageAdmin', {Category: doc1, Product: doc2})
            }
        })
    }
 })
})
// router.get('/add', function(req, res, next) {
//     // const categorys = Category.find({}).exec()
//     //   .then((categorys) => { 
//     //     res.render('addProduct', { categorys })
//     //   })
//     //   .catch((err) => {
//     //     throw err
//     //   })
//     Category.find().exec(function (err, doc) {
//       if (!err) {
//         // res.send(long);
//         res.render('them-san-pham', { Category: doc })
//       }
//     });
//   })
//router.post('/add', function)
module.exports = router;