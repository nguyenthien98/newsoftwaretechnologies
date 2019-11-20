var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Account = require('../models/Account');
var Product = require('../models/Product');
var Category = require('../models/Category');
router.get('/:username/:password', function(req, res, next){
    var md5 = require('md5');
    var sha256 = require('js-sha256');
    //var Account = require('./models/Account');
    
   
    //console.log(req.params.password);
    //var passwordhash = Hash.generate("12345");
    //var hash = sha256.hmac.create('12345');
    //res.send(md5('12345'));
    var passwordhash = md5(req.params.password);
    //res.send(passwordhash);
    //res.send(passwordhash);
    Account.findOne({
      username: req.params.username,
      password: passwordhash
    }).exec(function(err, doc){
      if(!err)
      {
        if(doc != null)
        {
          if(doc.username=="long14a12dgl")
          {
            //res.render('homePage');
            //res.render('homePageAdmin');
            res.redirect('/admins');
          }
          else
          {
            Category.find().exec(function(err1, doc1){
              if(!err1){
                Product.find().exec(function(err2, doc2){
                  if(!err2)
                  {
                    //res.send(doc);
                    res.render('trangmuahang-user', {Account: doc, Category: doc1, Product: doc2});
                  }
                })
              }
            })
            // res.render('trangmuahang-user', {Account: doc._id});
          }
        }
        else
        {
          res.redirect('/logins');
        }
        // res.send(doc)
      }
      else
      {
        console.log(err);
      }
    })
})
module.exports = router;