var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
    let formidable = require('formidable');
    var form = new formidable.IncomingForm();
    form.uploadDir = './uploads';
    form.keepExtensions = true;
    form.maxFieldsSize = 10*1024*1024; //10MB
    form.multiples = true;
    form.parse(req, (err, fields, files)=>{
        if(err)
        {
            res.json({
                result: "failed",
                data: {},
                message: `khong the upload file, error la: ${err}`
            });
        }
        var arrayOfFiles = files[""];
        if(arrayOfFiles.length > 0)
        {
            var fileNames = [];
            arrayOfFiles.forEach((eachFile) => {
                fileNames.push(eachFile.path)
            });
            res.json({
                result: 'OK',
                data: fileNames,
                numberOfImanges: fileNames.length,
                message: 'success fully upload'
            })
        }
        else
        {

        }
    })
});

module.exports = router;