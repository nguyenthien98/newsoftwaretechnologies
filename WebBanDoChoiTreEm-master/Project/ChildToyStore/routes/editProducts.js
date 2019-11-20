var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

// router.get('/', function(req, res, next){
//     res.render('editProduct');
// })
router.get('/getProd/:id', function (req, res, next) {
    //res.redirect('/editProducts');
    Category.find().exec(function(err, doc){
        if(!err)
        {
            res.render('editProduct', { Category: doc, id: req.params.id });
        }
    })
    //console.log(req.params.id);
    //res.render('editProduct');
    //res.send(req.params);
    // Category.findOne({
    //     _id: req.params.id,
    //     name: req.params.name
    // }).exec(function(err, doc){
    //     if(!err)
    //     {
    //         console.log('tim thay');
    //     }
    // })

})
router.post('/editProd',function(req, res, next) {
    Product.findOneAndUpdate(
        { _id: req.body.id },
        {
            $set: {
                name: req.body.name,
                soluong: req.body.soluong,
                gia: req.body.gia,
                ngaysx: req.body.ngaysx,
                baohanh: req.body.baohanh,
                mota: req.body.mota,
                anh: req.body.anh,
                cate_id: req.body.cate_id
            }
        }
    ).exec(function (err, doc) {
        if(!err) {
            res.redirect('/admins');
        }
    })
})
router.get('/removeProd/:id/', function(req, res, next){
    Product.findOne({_id: req.params.id}).exec(function(err, doc){
        if(!err){
            //res.send(doc);
            Product.collection.remove(doc);
            res.redirect('/admins');
        }
    });
})
module.exports = router;