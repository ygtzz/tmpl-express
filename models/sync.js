#!/usr/bin/env node
var models = require("./models");

//初始化mysql
models.sequelize.sync({
    success: function () {
        console.log('database sync success');
    }
})

//models.sequelize.sync({force:true}).success(function () {
//  var server = app.listen(app.get('port'), function () {
//    debug('Express server listening on port ' + server.address().port);
//  });
//});

