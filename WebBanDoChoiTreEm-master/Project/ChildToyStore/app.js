var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const mongoose = require('mongoose')

var categorys = require('./routes/categorys');
var products = require('./routes/products');
var registers = require('./routes/registers');
var logins = require('./routes/logins');
var quanlydanhmuc = require('./routes/quanlydanhmuc');
var guests = require('./routes/guests');
var admins = require('./routes/admins');
var addProducts = require('./routes/addProducts');
var upload_images = require('./routes/upload_images');
var editCategorys = require('./routes/editCategorys');
var editProducts = require('./routes/editProducts');
var carts = require('./routes/carts');
var timProducts = require('./routes/timProducts');
var users = require('./routes/users');
var dangnhap = require('./routes/dangnhap');
var creatUsers = require('./routes/creatUsers');
var doimatkhau = require('./routes/doimatkhau');
var bills = require('./routes/bills');
var donhang = require('./routes/donhang');
var app = express();

// 2
mongoose.Promise = global.Promise
const mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1/WebBanDoChoiDB'
mongoose.connect(mongoDB)

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'routes')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'models')));
app.use(express.static(path.join(__dirname, 'models')));

// 3
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))

// 4
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))

// 5
app.use(flash())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')
  next()
})

app.use('/categorys', categorys);
app.use('/products', products);
app.use('/registers', registers);
app.use('/logins', logins);
app.use('/quanlydanhmuc', quanlydanhmuc);
app.use('/guests', guests);
app.use('/admins', admins);
app.use('/addProducts', addProducts);
app.use('/upload_images', upload_images);
app.use('/editCategorys', editCategorys);
app.use('/editProducts', editProducts);
app.use('/carts', carts);
app.use('/timProducts', timProducts);
app.use('/users', users);
app.use('/dangnhap', dangnhap);
app.use('/creatUsers', creatUsers);
app.use('/doimatkhau', doimatkhau);
app.use('/bills', bills);
app.use('/donhang', donhang)
app.get('/accounts/:username/:password', function (req, res) {
  //var Hash = require('password-hash');
  var md5 = require('md5');
  var sha256 = require('js-sha256');
  var Account = require('./models/Account');
  var Product = require('./models/Product');
  var Category = require('./models/Category');
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
  }).exec(function (err, doc) {
    if (!err) {
      res.redirect('/logins/' + req.params.username + '/' + passwordhash);
    }
  })
});
app.get('/logins/:username/:password', function (req, res) {
  //var Hash = require('password-hash');
  var md5 = require('md5');
  var sha256 = require('js-sha256');
  var Account = require('./models/Account');
  var Product = require('./models/Product');
  var Category = require('./models/Category');
  var User = require('./models/User');
  //console.log(req.params.password);
  //var passwordhash = Hash.generate("12345");
  //var hash = sha256.hmac.create('12345');
  //res.send(md5('12345'));
  //var passwordhash = md5(req.params.password);
  //res.send(passwordhash);
  //res.send(passwordhash);
  Account.findOne({
    username: req.params.username,
    password: req.params.password
  }).exec(function (err, doc) {
    if (!err) {
      if (doc != null) {
        if (doc.username == "long14a12dgl") {
          //res.render('homePage');
          //res.render('homePageAdmin');
          res.redirect('/admins');
        }
        else {
          User.findOne({ acc_id: doc._id }).exec(function (err3, doc3) {
            if (!err) {
              if (doc3 == null) {
                //res.send('long');
                res.redirect('/creatUsers/' + doc._id);
              }
              else {
                Category.find().exec(function (err1, doc1) {
                  if (!err1) {
                    Product.find().exec(function (err2, doc2) {
                      if (!err2) {
                        //res.send(doc);
                        res.render('trangmuahang-user', { Account: doc, Category: doc1, Product: doc2 });
                      }
                    })
                  }
                })
                //res.render('trangmuahang-user', { Account: doc._id });
              }
            }
          })
        }
      }
      else {
        res.redirect('/logins');
      }
      // res.send(doc)
    }
    else {
      console.log(err);
    }
  })
});
app.get('/info/:prod_id/:acc_id', function (req, res, next) {
  var Product = require('./models/Product');
  var Account = require('./models/Account');
  var Category = require('./models/Category');
  Category.find().exec(function (err2, doc2) {
    if (!err2) {
      Product.findOne({ _id: req.params.prod_id }).exec(function (err, doc) {
        if (!err) {
          Account.findOne({ _id: req.params.acc_id }).exec(function (err1, doc1) {
            if (!err1) {
              res.render('chi-tiet-san-pham', { Product: doc, Account: doc1, Category: doc2 });
            }
          })
          //res.send(doc);
          //res.render('chi-tiet-san-pham', {Product: doc, Account: });
        }
      })
    }
  })
})
// app.post('/accounts/:username/:password', function(req, res){
//   //var Hash = require('password-hash');
//   var md5 = require('md5');
//   var sha256 = require('js-sha256');
//   var Account = require('./models/Account');
//   var Product = require('./models/Product');
//   var Category = require('./models/Category');
//   //console.log(req.params.password);
//   //var passwordhash = Hash.generate("12345");
//   //var hash = sha256.hmac.create('12345');
//   //res.send(md5('12345'));
//   var passwordhash = md5(req.params.password);
//   //res.send(passwordhash);
//   //res.send(passwordhash);
//   Account.findOne({
//     username: req.params.username,
//     password: passwordhash
//   }).exec(function(err, doc){
//     if(!err)
//     {
//       if(doc != null)
//       {
//         if(doc.username=="long14a12dgl")
//         {
//           //res.render('homePage');
//           //res.render('homePageAdmin');
//           res.redirect('/admins');
//         }
//         else
//         {
//           Category.find().exec(function(err1, doc1){
//             if(!err1){
//               Product.find().exec(function(err2, doc2){
//                 if(!err2)
//                 {
//                   //res.send(doc);
//                   res.render('trangmuahang-user', {Account: doc, Category: doc1, Product: doc2});
//                 }
//               })
//             }
//           })
//           // res.render('trangmuahang-user', {Account: doc._id});
//         }
//       }
//       else
//       {
//         res.redirect('/logins');
//       }
//       // res.send(doc)
//     }
//     else
//     {
//       console.log(err);
//     }
//   })
// });
app.get('/', function (req, res) {
  const Category = require('./models/Category');
  const Product = require('./models/Product');

  Category.find().exec(function (err, doc1) {
    if (!err) {
      //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa');
      // res.send(long);
      Product.find().exec(function (err1, doc2) {
        if (!err1) {
          //res.send(doc2);
          res.render('trang-mua-hang', { Category: doc1, Product: doc2 })
        }
      })
      //res.render('trang-mua-hang', { Category: doc1 })
    }
  });
})
// app.get('/:id', function(req, res){
//   const Category = require('./models/Category'); 
//   const Product = require('./models/Product');
//   //res.send('ok');
//   console.log(req.params.id);
// })
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //console.log('bug o day');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
