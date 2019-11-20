var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Account = require('../models/Account');
const Category = require('../models/Category');
const User = require('../models/User');
const Bill = require('../models/Bill');
router.get('/:acc_id', function (req, res, next) {
    //res.render('thanh-toan');
    Category.find().exec(function (err, doc) {
        if (!err) {
            Account.findOne({ _id: req.params.acc_id }).exec(function (err1, doc1) {
                if (!err1) {
                    User.findOne({ acc_id: req.params.acc_id }).exec(function (err2, doc2) {
                        if (!err2) {
                            Cart.find({ acc_id: req.params.acc_id }).exec(function (err3, doc3) {
                                if (!err3) {
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
                                    ]).exec(function (err4, doc4) {
                                        if (!err4) {
                                            //res.send(doc4)
                                            res.render('thanh-toan', { Category: doc, Account: doc1, User: doc2, Cart: doc4 });
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});
router.get('/addBill/:acc_id', function (req, res, next) {
    //res.send(Date());
    var ngay = Date();
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
    ]).exec(function (err4, doc4) {
        if (!err4) {
            
        }
    })
    
})
module.exports = router;