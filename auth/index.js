var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var tokenSecret = require('./config').tokenSecret;

var excludes = [
    '/api/users/login'
];

//全局api token验证拦截
router.all('/*', function(req,res,next){
    if(excludes.indexOf(req.path) == -1){
        var token =  (req.body && req.body.access_token) || 
                    (req.query && req.query.access_token) || 
                    req.headers['x-access-token'] || 
                    req.cookies['x-access-token'];
        jwt.verify(token, tokenSecret, function(err, decoded) {
          //过期跳转到登录
          if(err){
              return res.status(401);
          }
          //data无效，返回401
          if(!decoded.data || decoded.data.id != 'user'){
              return res.status(401);
          }
        });
    }
    next();
});

module.exports = router;