var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

router.get('/:id', function(req, res, next){
    Category.find().exec(function (err1, doc1) { 
        if(!err1)
        {
            Product.find({cate_id: req.params.id}).exec(function(err2, doc2){
                //res.send(doc2);
                if(!err2)
                {
                    res.render('trang-mua-hang', {Category: doc1, Product: doc2})
                }
            })
        }
     })
})

module.exports = router;