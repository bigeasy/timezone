var fs = require("fs");

module.exports = { zones: {}, rules: {} };

fs.readdirSync(__dirname).forEach(function (file) {
  if (file !== "index.js") {
    data = require(__dirname + "/" + file);
    for (var key in data.zones) {
      if (data.zones.hasOwnProperty(key)) {
        module.exports.zones[key] = data.zones[key];
      }
    }
    for (var key in data.rules) {
      if (data.rules.hasOwnProperty(key)) {
        module.exports.rules[key] = data.rules[key];
      }
    }
  }
});
