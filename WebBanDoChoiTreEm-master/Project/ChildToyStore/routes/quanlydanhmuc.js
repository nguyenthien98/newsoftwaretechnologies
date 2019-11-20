var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/Category');
//const Product = require('../models/Product');


router.get('/', (req, res, next) => {
    Category.find().exec(function (err, doc) {
        if (!err) {
            //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa');
          // res.send(long);
          res.render('quan-ly-danh-muc', { Category: doc })
        }
      });
    //res.render('quan-ly-danh-muc');
});
// 1
router.get('/add', (req, res, next) => {
    //console.log('long dep trai');
    res.render('addCategory')
})

// 2
router.post('/add', (req, res, next) => {
    //console.log('long dep trai');
    req.checkBody('name', 'Name is required').notEmpty()

    const errors = req.validationErrors()
    //console.log('bug o day');
    //   if (errors) {
    //     console.log(errors)
    //     res.render('addCategory', { category, errors })
    //   }

    //   const category = (new Category(req.body)).save()
    //     .then((data) => {
    //       res.redirect('/quanlydanhmuc', {category});
    //     })
    //     .catch((errors) => {
    //       console.log('oops...')
    //       console.log(errors)
    //     })
    const category = new Category(req.body);
    Category.collection.insertOne(category, function(err, doc){
        if(!err)
        {
            res.redirect('/quanlydanhmuc');
        }
    }
    )
})

// 3
module.exports = router;
