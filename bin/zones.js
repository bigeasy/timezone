function say() {
  if (arguments.length) console.log.apply(console, Array.prototype.slice.call(arguments, 0));
}

var transitions = require("../lib/transitions");

(function () {
  var _data = require("../timezones/index");
  var set = process.argv[2] ? [ process.argv[2] ] : Object.keys(_data.zones).filter(function (e) { return ! /^Etc/.test(e) });
  for (var i = 0, length = set.length; i < length; i++) { transitions(_data, set[i]) }
  for (var i = 0, length = set.length; i < length; i++) {
    try {
      var skipList = transitions(_data, set[i]).skipList;
      var zone = skipList.map(function (e) {
        return {
          wallclock: e.wallclock
        , format: e.format
        , abbrev: e.abbrev
        , offset: e.offset
        , posix: e.posix
        , save: e.save
        , rules: e.rules
        };
      })
      zone.forEach(function (e) { if (e.rules == null || e.rules === false)  delete e.rules });
      var rules = {};
      zone.forEach(function (e) { if (typeof e.rules == "string") rules[e.rules] = _data.rules[e.rules].slice(0) });
      for (var key in rules) rules[key].sort(function (a, b) { return b.to - a.to });
      for (var key in rules) rules[key] = rules[key].map(function (e) {
        return {
          from: e.from
        , to: e.to
        , month: e.month
        , day: e.day
        , time: e.time
        , clock: e.clock
        , save: e.save
        , letter: e.letter
        , saved: e.saved
        }
      });

      var record = {
        zones: {},
        rules: rules
      };
      record.zones[set[i]] = zone;
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
      fs.writeFileSync(parts.join("/") + ".js", 'exports.z=' + JSON.stringify(record), "utf8");
    } catch (e) {
      say("Failed on " + set[i] + ".");
      throw e;
    }
  }
})();
