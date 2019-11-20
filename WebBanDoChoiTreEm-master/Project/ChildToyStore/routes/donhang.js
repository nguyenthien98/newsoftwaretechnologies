var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res){
    res.render('quan-ly-don-hang-admin');
})
module.exports = router;