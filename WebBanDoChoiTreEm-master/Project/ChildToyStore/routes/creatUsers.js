var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Account = require('../models/Account');
const Category = require('../models/Category');
const Product = require('../models/Product');
router.get('/:acc_id', function(req, res, next){
    //res.send(req.params.acc_id);
    res.render('trang-dangky-thongtin', {_id: req.params.acc_id});
})
router.post('/add', function(req, res, next){
    req.checkBody('ten', 'ten is required').notEmpty();
    req.checkBody('gioitinh', 'gioitinh is required').notEmpty();
    req.checkBody('ngaysinh', 'ngaysinh is required').notEmpty();
    req.checkBody('diachi', 'diachi is required').notEmpty();
    req.checkBody('dienthoai', 'dienthoai is required').notEmpty();
    req.checkBody('vung', 'Name is required').notEmpty();
    req.checkBody('acc_id', 'acc_id is required').notEmpty();

    //res.send(req.body);
    const errors = req.validationErrors();
    if (errors) {
        console.log(errors)
        // res.render('addProduct', { product, errors })
        res.redirect('/');
    }
    var user = new User(req.body);
    User.collection.insertOne(user, function(err, doc){
        if(!err)
        {
            Account.findOne({_id: req.body.acc_id}).exec(function (err1, doc1){
                if(!err1)
                {
                    Category.find().exec(function(err2, doc2){
                        if(!err2)
                        {
                            Product.find().exec(function(err3, doc3){
                                if(!err3)
                                {
                                    res.render('trangmuahang-user', {Category: doc2, Product: doc3, Account: doc1} );
                                }
                            })
                        }
                    })
                }
            })   
        }
    })
})

router.get('/info/:acc_id', function(req, res, next){
    //res.render('trang-tai-khoan');
    User.findOne({acc_id: req.params.acc_id}).exec(function(err, doc){
        if(!err)
        {
            Category.find().exec(function(err1, doc1){
                if(!err1)
                {
                    Account.findOne({_id: req.params.acc_id}).exec(function(err2, doc2){
                        if(!err2)
                        {
                            res.render('trang-tai-khoan', {User: doc, Category: doc1, Account: doc2});
                        }
                    })
                }
            })
        }
    })
})
router.get('/getUser/:acc_id', function(req, res, next){
    //res.render('trang-chinh-sua-thongtin')
    Category.find().exec(function(err, doc){
        if(!err)
        {
            res.render('trang-chinh-sua-thongtin', {Category: doc, id: req.params.acc_id});
        }
    })
})
router.post('/edit', function(req, res, next){
    //res.send(req.params.acc_id);
    //res.render('trang-chinh-sua-thongtin');
    User.findOneAndUpdate(
        {acc_id: req.body.acc_id},
        {
            $set: {
                ten: req.body.ten,
                gioitinh: req.body.gioitinh,
                ngaysinh: req.body.ngaysinh,
                diachi: req.body.diachi,
                dienthoai: req.body.dienthoai,
                vung: req.body.vung,
                acc_id: req.body.acc_id
            }
        }
    ).exec(function(err, doc){
        if(!err)
        {
            Category.find().exec(function(err1, doc1){
                if(!err1)
                {
                    Account.findOne({_id: req.body.acc_id}).exec(function(err2, doc2){
                        if(!err2)
                        {
                            User.findOne({acc_id: req.body.acc_id}).exec(function(err3, doc3){
                                if(!err3)
                                {
                                    res.render('trang-tai-khoan', {User: doc3, Category: doc1, Account: doc2});
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})
module.exports = router;