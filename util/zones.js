function say() {
  if (arguments.length) console.log.apply(console, Array.prototype.slice.call(arguments, 0));
}

var transitions = require("./transitions");
var ABBREV = "Sun Mon Tue Wed Thu Fri Sat".split(/\s/);

// We are generating a file that contians the information for a zone plus any of
// the rules used by that zone. This menas that rules information is repeated
// throughout the dataset. Surprised that an earlier version of me was okay with
// that duplication. Obviously makes it easier to include a timezone wihtout
// recursing. TODO You know, though, you could use `require` in the definition
// to pull in the rules.

//
function write (name, skipList, data) {
  // Convert our skip list into just the moments of transition.
  var zone = skipList.map(function (e) {
    e = {
      wallclock: e.wallclock
    , format: e.format
    , abbrev: e.abbrev
    , offset: e.offset
    , posix: e.posix
    , save: e.save
    , rules: e.rules
    };
    if (typeof e.rules != "string") delete e.rules;
    return e;
  })
  // Delete any `rules` entry that is not the name of a rule.
  zone.forEach(function (e) { if (e.rules == null || e.rules === false)  delete e.rules });
  // Build a map of all the rules needed to use this zone info.
  var rules = {};
  zone.forEach(function (e) { if (typeof e.rules == "string") rules[e.rules] = data.rules[e.rules].slice(0) });
  // Sort descending.
  for (var key in rules) rules[key].sort(function (a, b) { return b.to - a.to });
  // Convert any rules that start at standard time to instead start at wallclock
  // time. Recall that standard time is just wallclock without any savings
  // applied. Recall too that the Olsen files are built from almanacs, decrees
  // and bills and that standard time is used in those pronoucements and the
  // Olsen files want to preserve that for legibility and maintainence in the
  // files. We use wallclock time or posix time in our lookup table. We convert
  // standard time to wallclock time.
  for (var key in rules) rules[key].forEach(function (e) {
    switch (e.clock) {
    case "standard":
      if (e.saved == null) break;
      e.clock = "wallclock"
      e.time += (e.saved / 6e4);
      break;
    default:
      if (!e.saved) e.saved = 0;
      break;
    }
  });
  function isLeapYear (year) {
    if (! (year % 400)) return true;
    if (! (year % 100)) return false;
    if (! (year % 4)) return true;
    return false;
  }
  // Apparently, `days` is an array where the the first element is a zero index
  // day of the week or seven. If seven, then the rule kicks on a specific date
  // in the second element. Otherwise, if the first element is negative, we
  // search for the last day, probably using negated last day as a date to
  // search from and decrementing. If the second element is positive it is a
  // date and we search for the day starting at the given date.
  const daysInMonth = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  for (var key in rules) rules[key] = rules[key].map(function (e) {
    var date = /^(?:(\d+)|last(\w+)|(\w+)>=(\d+))$/.exec(e.day), day, i, I;
    if (date[1]) {
      day = [ 7, parseInt(date[1], 10) ];
    } else if (date[2]) {
      for (i = 0, I = ABBREV.length; i < I; i++)
        if (ABBREV[i] === date[2]) break;
      if (e.month == 1) {
        for (var year = e.from; year <= e.to; year++) {
          var fields = new Date(Date.UTC(year, 1, 29));
          if (fields.getUTCDay() == i && fields.getUTCMonth() != 1) {
            throw new Error("Last day Februrary: " + key + ", " + i + ", " + fields.getUTCDay() + ", " + fields.getUTCMonth() + ", " + year);
          }
        }
      }
      day = [ i, -daysInMonth[e.month] ];
    } else {
      for (i = 0, I = ABBREV.length; i < I; i++)
        if (ABBREV[i] === date[3]) break;
      day = [ i, parseInt(date[4], 10) ];
    }
    // This indent style is stupid. Aesthetically unpleasing. Gap at the outset.
    // A jitter to read. What problem is it supposed to solve? A missing comma
    // is always caught by the compiler with a line and column.
    return {
      from: e.from
    , to: e.to
    , month: e.month
    , day: day
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
  zone.unshift("z");
  record.zones[name] = zone;
  var fs = require("fs");
  var parts = [ "build", "timezone" ].concat(name.split(/\//)), path;
  for (var j = 0, stop = parts.length - 1; j < stop; j++) {
    path = parts.slice(0, j + 1).join("/");
    try {
      fs.statSync(path);
    } catch (e) {
      if (e.code != "ENOENT") throw e;
      fs.mkdirSync(path, 0755);
    }
  }
  fs.writeFileSync(parts.join("/") + ".js", 'module.exports=' + JSON.stringify(record), "utf8");
}

(function () {
  var data = { zones: {}, rules: {} }, skipLists = {};
  require("../build/olson/index").forEach(function (zone) {
    for (var key in zone.zones) data.zones[key] = zone.zones[key];
    for (var key in zone.rules) data.rules[key] = zone.rules[key];
  });
  require("../build/olson/index").forEach(function (zone) {
    for (var key in zone.links) {
      if (~key.indexOf('/')) {
        data.zones[key] = data.zones[zone.links[key]];
      }
    }
  });
  var set = process.argv[2] ? process.argv.slice(2) : Object.keys(data.zones);
//  for (var i = 0, length = set.length; i < length; i++) { transitions(data, set[i]) }
  for (var i = 0, length = set.length; i < length; i++) {
    try {
      var transition = transitions(data, set[i])
      write(set[i], skipLists[set[i]] = transition.skipList, data);
    } catch (e) {
      say("Failed on " + set[i] + ".");
      throw e;
    }
  }
  for (var key in data.links) {
    write(key, skipLists[data.links[key]], data);
  }
})();
