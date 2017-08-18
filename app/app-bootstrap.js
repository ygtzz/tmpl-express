var path = require('path');

global.appRequire = function(modPath) {
    return require(path.resolve(__dirname, modPath))
}