var fs = require("fs");

module.exports = [];

function glob (directory) {
  fs.readdirSync(directory).forEach(function (file) {
    var path, stat;
    if (! /^\.|^index.js$/.test(file)) {
      path = directory + "/" + file
      stat = fs.statSync(path);
      if (stat.isDirectory()) {
        glob(path);
      } else {
        module.exports.push(require(path));
      }
    }
  });
}


glob(__dirname);
