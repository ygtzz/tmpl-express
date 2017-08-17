var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
    var list = [{name:'zhangsan',age:11},{name:'lisi',age:33}];
    res.json({
        data:list
    });
});

router.get('/models', function(req, res, next) {
    var list = [{name:'zhangsan',age:11},{name:'lisi',age:33}];
    res.json({
        data:list
    });
});


module.exports = router;
