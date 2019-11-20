var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Account = require('../models/Account');
const Category = require('../models/Category');
router.get('/:id', function (req, res, next) {
    Account.findOne({ _id: req.params.id }).exec(function (err, doc) {
        if (!err) {
            Category.find().exec(function (err1, doc1) {
                if (!err1) {
                    var objectId = new mongoose.Types.ObjectId(req.params.id);

                    Cart.aggregate([
                        {
                            $lookup:
                            {
                                from: "products",
                                localField: "prod_id",
                                foreignField: "_id",
                                as: "Product"
                            }
                        },
                        {
                            $match:
                            {
                                acc_id: objectId
                            }
                        }
                    ]).exec(function (err, doc2) {
                        if (!err) {
                            //res.send(doc2);
                            res.render('gio-hang', { Category: doc1, Cart: doc2, Account: doc })
                            //   res.send(doc2);
                            //res.render('gio-hang', {Category: doc1, Cart: doc2, Account: doc});
                        }
                    })
                    // Cart.find({acc_id: req.params.id}).exec(function(err2, doc2){
                    //     if(!err2)
                    //     {
                    //         //console.log(doc2.prod_id);
                    //         // Product.find({_id: doc2.prod_id}).exec(function(err3, doc3){
                    //         //     if(!err3)
                    //         //     {
                    //         //         res.render('gio-hang', {Category: doc1, Cart: doc2, Product: doc3, Account: doc});
                    //         //     }
                    //         // })
                    //     }
                    // })
                }
            })
            //res.send(doc);
            //res.render('gio-hang', {Account: doc});
        }
    })

})
router.get('/:prod_id/:acc_id/:acc_username/:acc_password', function (req, res, next) {
    //res.send(req.params.acc_password);
    var cart = new Cart({ acc_id: req.params.acc_id, prod_id: req.params.prod_id });
    //res.send(cart);
    Cart.collection.insertOne(cart, function (err, doc) {
        if (!err) {
            //res.send(req.params.acc_password);
            res.redirect('/logins/' + req.params.acc_username + '/' + req.params.acc_password);
            //res.send(doc);
        }
    })
    // res.render('gio-hang');
})

router.get('/removeProd/:cart_id/:acc_id', function (req, res, next) {
    //res.send(req.params.cart_id);
    Cart.findOne({ _id: req.params.cart_id }).exec(function (err3, doc3) {
        if (!err3) {
            Cart.collection.remove(doc3);

            Account.findOne({ _id: req.params.acc_id }).exec(function (err, doc) {
                if (!err) {
                    Category.find().exec(function (err1, doc1) {
                        if (!err1) {
                            var objectId = new mongoose.Types.ObjectId(req.params.acc_id);

                            Cart.aggregate([
                                {
                                    $lookup:
                                    {
                                        from: "products",
                                        localField: "prod_id",
                                        foreignField: "_id",
                                        as: "Product"
                                    }
                                },
                                {
                                    $match:
                                    {
                                        acc_id: objectId
                                    }
                                }
                            ]).exec(function (err, doc2) {
                                if (!err) {
                                    //res.send(doc2);
                                    res.render('gio-hang', { Category: doc1, Cart: doc2, Account: doc })
                                    //   res.send(doc2);
                                    //res.render('gio-hang', {Category: doc1, Cart: doc2, Account: doc});
                                }
                            })
                            // Cart.find({acc_id: req.params.id}).exec(function(err2, doc2){
                            //     if(!err2)
                            //     {
                            //         //console.log(doc2.prod_id);
                            //         // Product.find({_id: doc2.prod_id}).exec(function(err3, doc3){
                            //         //     if(!err3)
                            //         //     {
                            //         //         res.render('gio-hang', {Category: doc1, Cart: doc2, Product: doc3, Account: doc});
                            //         //     }
                            //         // })
                            //     }
                            // })
                        }
                    })
                    //res.send(doc);
                    //res.render('gio-hang', {Account: doc});
                }
            })
        }
    })
})
module.exports = router;