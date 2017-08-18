var express = require('express');
var router = express.Router();
var formidable = require('formidable');

//upload demo
router.post('/upload', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.uploadDir="./uploads";
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if(err){
      res.json({status:500,msg:'upload error'});
    }
    else{
      res.json({url:files.file.path.replace('public',''),size:files.file.size});
    }
  });
});

router.get('/list', function(req, res, next) {
    var list = [{name:'zhangsan',age:11},{name:'lisi',age:33}];
    res.json({
        data:list
    });
});

router.get('/models', function(req, res, next) {
    var list = [{name:'model1',age:11},{name:'model2',age:33}];
    res.json({
        data:list
    });
});


module.exports = router;
