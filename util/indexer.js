// Load all of the modules in a directory and any sub-directories. Used to
// implement `index.js` in the `locales` directory and the `zones` directory and
// sub-directories.

var filename = process.argv[2]
var fs = require("fs");
var _path = require("path");
var include, exclude;

function glob (exports, directory, include, exclude) {
  var requires = [];
  require("fs").readdirSync(directory).forEach(function (file) {
    var skip, path, stat;
    skip = skip || /^(index.js|rfc822.js|slurp.js|synopsis.js|timezone.js|zones.js|loaded.js|README)$/.test(file);
    skip = skip || /^[._]/.test(file);
    skip = skip || (exclude && exclude.test(file));
    skip = skip || include && ! include.test(file);
    if (! skip) {
      path = _path.join(directory, file);
      stat = fs.statSync(path);
      if (stat.isDirectory()) {
        glob(exports, path);
      } else if (/\.js$/.test(file)) {
        requires.push('require(' + JSON.stringify('./' + file) + ')')
      }
    }
  });
  process.stdout.write('module.exports = [' + requires.join(',') + ']\n');
}

var $;
if (($ = /(.)zones.js$/.exec(filename)) && _path.sep == $[1]) {
  include = /./;
  exclude = /^\w{2}_\w{2}.js$/;
} else if (($ = /(.)locales.js$/.exec(filename)) && _path.sep == $[1]) {
  include = /^\w{2}_\w{2}.js$/;
}

glob(module.exports = [], _path.dirname(filename), include, exclude);
