

var data = require("../timezones/index");
var set = process.argv[2] ? [ process.argv[2] ] : Object.keys(data.zones).filter(function (e) { return ! /^Etc/.test(e) });
var clock = { standard: {}, posix: {}, wallclock: {} };
for (var i = 0, length = set.length; i < length; i++) {
  var zone = data.zones[set[i]], j;
  for (j = zone.length - 1; j >= 0; --j) {
    clock[zone[j].clock || "wallclock"][set[i]] = true;
  }
}
console.log("Standard: " + Object.keys(clock.standard).join(", "));
console.log("POSIX: " + Object.keys(clock.posix).join(", "));
var clock = { standard: {}, posix: {}, wallclock: {} };
for (var i = 0, length = set.length; i < length; i++) {
  for (var rule in data.rules) {
    var transitions = data.rules[rule];
    for (j = transitions.length - 1; j >= 0; --j) {
      clock[transitions[j].clock || "wallclock"][rule] = true;
    }
  }
}
var __slice = [].slice;
function die () {
  console.log.apply(console, __slice.call(arguments, 0));
  return process.exit(1);
};

function say () { return console.log.apply(console, __slice.call(arguments, 0)) }
console.log("Standard: " + Object.keys(clock.standard).join(", "));
console.log("POSIX: " + Object.keys(clock.posix).join(", "));
var transitions = require("../lib/transitions");
var min = { diff: Number.MAX_VALUE };
for (var i = 0, length = set.length; i < length; i++) {
  var table = transitions(data, set[i]), diff;
  for (j = 2, J = table.length; j < J; j++) {
    if (!table[j - 1].posix) die(set[i], table[j - 1], i);
    diff = Math.abs(table[j].posix - table[j - 1].posix);
    if (diff < min.diff) min = { diff: diff, name: set[i] };
  }
}
console.log(min.name, min.diff / 6e4);
var min = { diff: Number.MAX_VALUE };
function iso8601 (date) { return new Date(date).toISOString().replace(/\..*$/, "") }
for (var i = 0, length = set.length; i < length; i++) {
  var table = transitions(data, set[i]), diff, j, J, next;
  for (j = 2, J = table.length; j < J; j++) {
    table[j].begins = iso8601(table[j].posix);
  }
  for (next = 0, j = table.length - 1; j > 0; j--) {
    if (!table[j].posix) die(set[i], table[j], i);
    if (table[j + next].offset == table[j - 1].offset && table[j + next].abbrev == table[j - 1].abbrev) {
      //say("skip", table[j + next], table[j - 1], diff);
      next++;
    } else {
      diff = Math.abs(table[j - 1].posix - table[j + next].posix);
      if (diff < min.diff) {
        //say("min", table[j + next], table[j - 1], table[j - 1].posix - table[j + next].posix , diff, min.diff);
        min = { diff: diff, name: set[i] };
      }
      next = 0;
    }
  }
}
console.log(min.name, min.diff / 6e4 / 60 / 24);
