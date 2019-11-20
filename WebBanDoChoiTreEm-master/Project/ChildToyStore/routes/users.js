var express = require('express');
var router = express.Router();
const Account = require('../models/Account');
const Product = require('../models/Product');
const Category = require('../models/Category');
/* GET users listing. */
router.get('/timProducts/:cate_id/:acc_id', function (req, res, next) {
  Account.findOne({ _id: req.params.acc_id }).exec(function (err, doc) {
    if (!err) {
      Category.find().exec(function (err1, doc1) {
        if (!err1) {
          Product.find({ cate_id: req.params.cate_id }).exec(function (err2, doc2) {
            //res.send(doc2);
            if (!err2) {
              //console.log(doc._id);
              res.render('trangmuahang-user', {Account: doc, Category: doc1, Product: doc2 })
            }
          })
        }
      })
    }
  })
});

module.exports = router;
