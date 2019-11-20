var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Account = require('../models/Account');
const Category = require('../models/Category');
const Product = require('../models/Product');
const md5 = require('md5');
router.get('/:id', function (req, res, next) {
    res.render('doimatkhau', { id: req.params.id });
})
router.post('/', function (req, res, next) {
    req.checkBody('oldpassword', 'oldpassword is required').notEmpty();
    req.checkBody('newpassword', 'newpassword is required').notEmpty();
    req.checkBody('confirmPassword', 'confirmPassword is required').notEmpty();
    req.checkBody('acc_id', 'acc_id is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        console.log(errors)
        // res.render('addProduct', { product, errors })
        res.redirect('/');
    }
    if (req.body.newpassword != req.body.confirmPassword) {
        //res.send('error');
        res.redirect('/doimatkhau/' + req.body.acc_id);
    }
    else {
        var oldpasswordhash = md5(req.body.oldpassword);
        var passwordhash = md5(req.body.newpassword);
        //res.send(passwordhash);
        Account.findOne({ _id: req.body.acc_id }).exec(function (err, doc) {
            if (!err) {
                //res.send(doc.password);
                if (doc.password != oldpasswordhash) {
                    res.redirect('/doimatkhau/' + req.body.acc_id);
                }
                else {
                    Account.findOneAndUpdate(
                        { _id: req.body.acc_id },
                        {
                            $set: {
                                username: doc.username,
                                email: doc.email,
                                password: passwordhash
                            }
                        }
                    ).exec(function(err1, doc1){
                        if(!err1)
                        {
                            //res.send(doc1);
                            Account.findOne({_id: req.body.acc_id}).exec(function(err2, doc2){
                                if(!err2)
                                {
                                    Category.find().exec(function(err3, doc3){
                                        if(!err)
                                        {
                                            Product.find().exec(function(err4, doc4){
                                                res.render('trangmuahang-user', { Account: doc2, Category: doc3, Product: doc4 });
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    }

})
module.exports = router;