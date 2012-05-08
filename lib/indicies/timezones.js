module.exports = { zones: {}, rules: {}, links: {} };
require("fs").readdirSync(__dirname).forEach(function (file) {
  if (file !== "index.js") {
    data = require(__dirname + "/" + file);
    for (var key in data.zones) {
      module.exports.zones[key] = data.zones[key];
    }
    for (var key in data.rules) {
      module.exports.rules[key] = data.rules[key];
    }
    for (var key in data.links) {
      module.exports.links[key] = data.links[key];
    }
  }
});
