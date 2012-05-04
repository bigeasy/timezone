function say() {
  if (arguments.length) console.log.apply(console, Array.prototype.slice.call(arguments, 0));
}

var transitions = require("../lib/transitions");

(function () {
  function zoneinfo (table) {
    table.splice(0, 2);
    var abbrevs = [], index;
    if (table.length == 0) return table;
    while (typeof table[0] != "number") abbrevs.push(table.shift());
    for (var i = 0, I = Math.floor(table.length / 4); i < I; i++) {
      var j = i * 4;
      table[j + 1] = Math.round((table[j] - table[j + 1]) * 1000 * 100);
      table[j] = Math.round(table[j] * 1000 * 100);
      table[j + 2] = Math.round(table[j + 2] * 1000 * 60 * 10);
      table[j + 3] = abbrevs[table[j + 3]];
    }
    table.push(-Number.MAX_VALUE, -Number.MAX_VALUE, 0, abbrevs[table.pop()]);
    return table;
  }
  var _data = require("../timezones/index");
  var set = process.argv[2] ? [ process.argv[2] ] : Object.keys(_data.zones).filter(function (e) { return ! /^Etc/.test(e) });
  for (var i = 0, length = set.length; i < length; i++) {
    try {
      var table = transitions(_data, set[i]);
      var abbrevs = {};
      for (var j = 1, J = table.length; j < J; j++) {
        abbrevs[table[j].abbrev] = true;
      }
      var encoded = [ "", table[1].wallclock - table[1].posix ];
      for (var abbrev in abbrevs) {
        encoded.push(abbrev);
      }
      for (var j = 1, J = table.length - 1; j < J; j++) {
        encoded.push(table[j].posix / 1000 / 100);
        encoded.push(((table[j].posix / 1000) - (table[j].wallclock / 1000)) / 100);
        encoded.push(table[j].save / 1000 / 60 / 10);
        encoded.push(encoded.indexOf(table[j].abbrev) - 2);
      }
      encoded.push(encoded.indexOf(table[table.length - 1].abbrev) -2);
      encoded[0] = set[i];
      var decoded = zoneinfo(encoded.slice(0));
      var equal = require("assert").equal;
      for (var j = 1, J = table.length; j < J; j++) {
        var k = j - 1;
        equal(table[j].posix,  decoded[k * 4]);
        equal(table[j].wallclock, decoded[k * 4 + 1]);
        equal((table[j].save || 0), decoded[k * 4 + 2]);
        equal(table[j].abbrev, decoded[k * 4 + 3]);
      }
      var fs = require("fs");
      var parts = [ "zones" ].concat(set[i].split(/\//)), path;
      for (var j = 0, stop = parts.length - 1; j < stop; j++) {
        path = parts.slice(0, j + 1).join("/");
        try {
          fs.statSync(path);
        } catch (e) {
          if (e.code != "ENOENT") throw e;
          fs.mkdirSync(path, 0755);
        }
      }
      fs.writeFileSync(parts.join("/") + ".js", 'exports.z=' + JSON.stringify(encoded), "utf8");
    } catch (e) {
      say("Failed on " + set[i] + ".");
      throw e;
    }
  }
})();
