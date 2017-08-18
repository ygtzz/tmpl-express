var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('user', { title: 'User' });
});

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

module.exports = router;