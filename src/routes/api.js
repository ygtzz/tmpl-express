var express = require('express');
var router = express.Router();
var formidable = require('formidable');

router.post('/login', function(req, res, next) {
    var params = req.body;
    var result = {
        status: 401
    };
    if (params.name == 'admin' && params.pwd == '123456') {
        var token = jwt.sign({
            data: {
                id: 'feadmin'
            }
        }, tokenSecret, { expiresIn: '6h' });
        result = {
            data: {
                token: token
            },
            status: 200
        }
    }
    res.json(result);
});

//upload demo
router.post('/auth/upload', function(req, res, next) {
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

router.get('/auth/models', function(req, res, next) {
    var list = [{name:'model1',age:11},{name:'model2',age:33}];
    res.json({
        data:list
    });
});


module.exports = router;
