"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = appRequire('config')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: "mysql",
    storage:  "test.mysql",
    port: config.port,
    define: {
        classMethods: {
            pageOffset: function (pageNum) {
                if (isNaN(pageNum) || pageNum < 1) {
                    pageNum = 1;
                }
                return (pageNum - 1) * this.pageLimit();
            },
            pageLimit: function () {
                return 10; //每页显示10条
            },
            totalPages: function (totalNum) {
                var total = parseInt((totalNum + this.pageLimit() - 1) / this.pageLimit()),
                    arrayTotalPages = [];
                for (var i = 1; i <= total; i++) {
                    arrayTotalPages.push(i);
                }
                return arrayTotalPages;
            }
        },
        instanceMethods: {},
        timestamps: false,
        freezeTableName: true
    }
});
var db        = {};

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== 'sync.js');
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
