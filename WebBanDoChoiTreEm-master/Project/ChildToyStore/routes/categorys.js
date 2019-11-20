var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/Category');


router.get('/', (req, res, next) => {
  const categorys = Category.find({}).exec()
    .then((categorys) => {
      //console.log('long');
      res.render('categorys', { categorys: categorys })
  }, (err) => {
    throw err
  })
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
  if (errors) {
    console.log(errors)
    res.render('addCategory', { category, errors })
  }
 
  const category = (new Category(req.body)).save()
    .then((data) => {
      res.redirect('/categorys')
    })
    .catch((errors) => {
      console.log('oops...')
      console.log(errors)
    })
})
 
// 3
module.exports = router;
