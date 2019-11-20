var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/getCate/:id/:name', function (req, res, next) {
    //console.log(req.params.id);
    res.render('editCategory', { id: req.params.id });
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

router.post('/editCate', function (req, res, next) {
    //res.send(req.body.name);
    // Category.findOne({_id: req.body.id}).exec(function(err, doc){
    //     doc.name = req.body.name;
    //     Category.collection.save(doc);
    //     res.redirect('/quanlydanhmuc');
    // });
    Category.findOneAndUpdate(
        { _id: req.body.id },
        {
            $set: {
                name: req.body.name
            }
        }
    ).exec(function (err, doc) {
        if(!err) {
            res.redirect('/quanlydanhmuc');
        }
    })
})

router.get('/removeCate/:id', function (req, res, next){
    Category.findOne({_id: req.params.id}).exec(function(err, doc){
        Category.collection.remove(doc);

        Product.find({cate_id: req.params.id}).exec(function(err, doc){
            if(!err){
                for(var i = 0; i < doc.length; i ++){
                    Product.collection.remove(doc[i]);
                };
                res.redirect('/quanlydanhmuc');
            }
        });
        // res.redirect('/quanlydanhmuc');
    });
});

module.exports = router;