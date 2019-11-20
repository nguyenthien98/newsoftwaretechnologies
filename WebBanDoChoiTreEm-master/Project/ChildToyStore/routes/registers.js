var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Account = require('../models/Account');
const Hash = require('password-hash');
const md5 = require('md5');
const equals = require('equals');
router.get('/', function (req, res) {
    res.render('register');
})

router.post('/', function (req, res) {
    req.checkBody('username', 'regis-username is required').notEmpty();
    req.checkBody('email', 'regis-email is required').isEmail();
    req.checkBody('password', 'regis-password is required').notEmpty();
    req.checkBody('confirmPassword', 'regis-confirmPassword is required').notEmpty();
    //var passhash = req.body.password;
    //console.log(passhash);
    //res.send(req.body.confirmPassword);
    // Account.find({username: req.body.username}).exec(function(err, doc){
    //     if(!err)
    //     {
    //         //res.send(doc);
    //         // if(doc.length!=0)
    //         // {
    //         //     res.redirect('/registers');
    //         // }
    //     }
    // })    
    if (req.body.password != req.body.confirmPassword) {
        res.redirect('/registers');
    }
    else {
        Account.findOne({ username: req.body.username }).exec(function (err, doc) {
            if (!err) {
                if (doc != null) {
                    if (req.body.username == doc.username) {
                        //res.send('ok');
                        res.redirect('/registers');
                    }
                }
                else {
                    const errors = req.validationErrors();
                    if (errors) {
                        console.log(errors);
                        //console.log('bug roi');
                        //res.render('login-and-register', {account, errors});
                        res.redirect('/registers');
                        //res.send('khong thanh cong');
                    }
                    var passwordhash = md5(req.body.password);
                    const account = (new Account({
                        username: req.body.username,
                        email: req.body.email,
                        password: passwordhash
                    })).save()
                        .then((data) => {
                            console.log('tao tai khoan thanh cong');
                            res.render('login-and-register');
                        })
                        .catch((errors) => {
                            console.log('oops...');
                            console.log(errors);
                        })
                }
            } else {
                const errors = req.validationErrors();
                if (errors) {
                    console.log(errors);
                    //console.log('bug roi');
                    //res.render('login-and-register', {account, errors});
                    res.redirect('/registers');
                    //res.send('khong thanh cong');
                }
                var passwordhash = md5(req.body.password);
                const account = (new Account({
                    username: req.body.username,
                    email: req.body.email,
                    password: passwordhash
                })).save()
                    .then((data) => {
                        console.log('tao tai khoan thanh cong');
                        res.render('login-and-register');
                    })
                    .catch((errors) => {
                        console.log('oops...');
                        console.log(errors);
                    })
            }
        })
    }
})

module.exports = router;
