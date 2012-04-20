en_US = {
  day: {
    abbrev: "Sun Mon Tue Wed Thu Fri Sat".split(/\s/),
    full: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(/\s+/)
  }
};
function die () {
  if (arguments.length) console.log.apply(console, Array.prototype.slice.call(arguments, 0));
  process.exit(1);
}

function say() {
  if (arguments.length) console.log.apply(console, Array.prototype.slice.call(arguments, 0));
}

const SECOND = 1000, MINUTE = SECOND * 60, HOUR = MINUTE * 60, DAY = HOUR * 24;

data = (function () {
  function copy(dest, source) {
    for (var key in source) if (source.hasOwnProperty(key)) dest[key] = source[key];
  }
  var file, continent, zoneFiles = require('fs').readdirSync('./timezones'), data = { zones: {}, rules: {} };
  for (var i = 0, stop = zoneFiles.length; i < stop; i++) {
    file = zoneFiles[i]; 
    if (file === 'index.js' || /^\./.test(file)) continue;
    continent = require('./timezones/' + file, 'utf8');
    copy(data.zones, continent.zones);
    copy(data.rules, continent.rules);
  }
  return data;
})();

var transitions = (function createTransitions() {

  function parseOffset (pattern) {
    if (typeof pattern == "number") return pattern;

    var offset = 0;

    // TODO Revert when rules becomes an offset integer.
    var match = /^(-?)(\d+)(?::(\d+))?(?::(\d+))?$/.exec(pattern)
    if (! match) return null;
    match = match.slice(1, 5);
    match[0] += '1'

    var milliseconds = [ HOUR, MINUTE, SECOND ];
    for (var i = 1, stop = match.length; i < stop; i++) {
      offset += parseInt(match[i] || '0', 10) * milliseconds[i - 1];
    }

    offset *= parseInt(match[0]);

    return offset;
  }

  function isLeapYear (year) {
    if (year % 400 == 0) return true;
    if (year % 100 == 0) return false
    if (year % 4 == 0) return true;
    return false;
  }

  var DAYS_IN_MONTH = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  function daysInMonth (month, year) {
    var days = DAYS_IN_MONTH[month];
    if (month == 1 && isLeapYear(year)) days++;
    return days;
  }

  function parseUntil (until) {
    if (until) {
      var fields = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).000Z$/.exec(until).slice(1, 7);
      for (var i = 0, stop = fields.length; i < stop; i++) {
        fields[i] = parseInt(fields[i], 10);
      }
      --fields[1];
      return Date.UTC.apply(Date.UTC, fields);
    }
    return Number.MAX_VALUE;
  }
  function actualize (entry, rule, year, ruleIndex) {
    var time = /^(\d+):(\d+)(?::(\d+))?[us]?$/.exec(rule.time).slice(1, 4);
    for (var i = 0; i < 3; i++) {
      time[i] = parseInt(time[i] || 0, 10);
    }
    var hours = time[0], minutes = time[1], seconds = time[2];
    var date = /^(?:(\d+)|last(\w+)|(\w+)>=(\d+))$/.exec(rule.day);
    var fields;
    if (date[1]) {
      fields = new Date(Date.UTC(year, rule.month, parseInt(date[1], 10), hours, minutes, seconds));
    } else if (date[2]) {
      var days = en_US.day.abbrev;
      for (var i = 0, stop = days.length; i < stop; i++)
        if (days[i] === date[2]) break;
      var day = daysInMonth(rule.month, year);
      for (;;) {
        fields = new Date(Date.UTC(year, rule.month, day, hours, minutes, seconds))
        if (fields.getUTCDay() === i) break;
        day--;
      }
    } else {
      var min = parseInt(date[4], 10);
      var days = en_US.day.abbrev;
      for (var i = 0, stop = days.length; i < stop; i++)
        if (days[i] === date[3]) break;
      day = 1;
      for (;;) {
        fields = new Date(Date.UTC(year, rule.month, day, hours, minutes, seconds))
        if (fields.getUTCDay() === i && fields.getUTCDate() >= min) break;
        day++;
      }
    }

    var save = parseOffset(rule.save || '0');

    var offset = entry.offset;

    var sortable, wallclock, clock, posix, standard;
    if (/u$/.test(rule.time)) {
      posix = fields.getTime();
      fields = new Date(fields.getTime() + offset);
      clock = "posix";
    } else if (/s$/.test(rule.time)) {
      standard = fields.getTime();
      fields = new Date(standard);
      clock = "standard";
    } else {
      wallclock = fields.getTime();
      fields = new Date(wallclock);
      clock = "wallclock";
    }

    sortable = Date.UTC(fields.getUTCFullYear(), fields.getUTCMonth(), fields.getUTCDate());

    return {
      clock: clock,
      standard: standard,
      entry: entry,
      sortable: sortable,
      rule:rule,
      wallclock: wallclock,
      year: year,
      posix: posix,
      save: save,
      ruleIndex: ruleIndex,
      offset: offset
    };
  }

  function setClocks (record, effective, clock) {
    var offset = effective.offset
      , save = effective.save;
    switch (clock || record.clock) {
    case "posix":
      record.standard = record.posix + offset;
      record.wallclock = record.posix + offset + save;
      break;
    case "wallclock":
      record.posix = record.wallclock - offset - save;
      record.standard = record.wallclock + save;
      break;
    case "standard":
      record.posix = record.standard - offset;
      record.wallclock = record.standard + save;
      break;
    }
    return record;
  }

  function ruleClock(rule) {
    if (/[ugz]$/.exec(rule.time)) return "posix";
    if (/s$/.exec(rule.time)) return "standard";
    return "wallclock";
  }

  function getYear (time) { return new Date(time).getUTCFullYear() }

  function pushRule (table, entry, actual, abbrevs) {
    var save = parseOffset(actual.rule.save || "0")
      , abbrev = abbrevs[save ? 1 : 0] || entry.format.replace(/%s/, function () { return actual.rule.letter });
    table.push({
      actualization: true,
      offset: entry.offset,
      abbrev: abbrev,
      clock: actual.clock,
      wallclock: actual.wallclock,
      posix: actual.posix,
      standard: actual.standard,
      save: parseOffset(actual.rule.save || "0")
    });
  }

  function iso8601 (date) { return new Date(date).toISOString().replace(/\..*$/, "") }

  function step (begin, end, table) {
    var match
      , actual
      , max;

    // Oink. Oink. We'll be pigs.

    var rule
      , abbrevs
      , year = getYear(new Date().getTime())
      , rules = data.rules[begin.rules].slice(0)
      , actualized = [];
    
    if (abbrevs = /(\w+)\/(\w+)/.exec(begin.format)) abbrevs.shift();
    else abbrevs = []

    for (var i = 0, length = rules.length; i < length; i++) {
      rules[i].clock = ruleClock(rules[i]); // TODO Temporary.
      for (var j = rules[i].from, to = Math.min(rules[i].to, year); j <= to; j++) {
        actualized.push(actualize(begin, rules[i], j, i));
      }
    }

    actualized.sort(function (a, b) { return a.sortable - b.sortable });

    i = 0, length = actualized.length

    for (; i < length; i++) {
      if (begin[actualized[i].clock] <= actualized[i][actualized[i].clock]) break;
    }
   
    var previous = begin;

    if (begin[actualized[i].clock] == actualized[i][actualized[i].clock]) {
      table.pop(); // A rule on the seam overrides the seam.
      previous = table[table.length - 1];
    } else {
      if (i === 0) {
        var rules = data.rules[begin.rules], offset;
        for (var j = 0; j < rules.length; j++) {
          if (!(offset = parseOffset(rules[j].save || "0"))) {
            begin.abbrev = abbrevs[0] || begin.format.replace(/%s/, function () { return rules[j].letter });
            break;
          }
        }
      } else {
        begin.save = parseOffset(actualized[i - 1].save);
        begin.abbrev = abbrevs[begin.save ? 1 : 0] || begin.format.replace(/%s/, function () { return actualized[i - 1].rule.letter });
      }
    }

    for (; i < length; i++) {
      setClocks(actualized[i], previous);
      if (actualized[i][end.clock] >= end[end.clock]) {
        break;
      }
      pushRule(table, begin, actualized[i], abbrevs);
      previous = actualized[i];
    }
  }

  function walk (begin, end, table) { 
    step(begin, end, table);
    return table[table.length - 1];
  }

  function begins (zone) {
    var copy = [];
    for (var i = zone.length - 2; i >= 0; --i) {
      copy[i] = {
        rules: zone[i].rules,
        format: zone[i].format,
        offset: parseOffset(zone[i].offset),
        save: 0,
        // TODO Intermediate format is all kinds of broken.
        clock: zone[i + 1].utc ? 'posix' : (zone[i + 1].standard ? 'standard' : 'wallclock')
      };
      copy[i][copy[i].clock] = parseUntil(zone[i + 1].until);
    }

    copy.push({
      offset: parseOffset(zone[zone.length - 1].offset),
      format: zone[zone.length - 1].format,
      save: 0
    });

    copy.reverse();
    copy[0].posix = copy[0].wallclock = Number.MIN_VALUE;
    copy.forEach(function (e) { e.begins =  iso8601(e[e.clock]) + " " + e.clock });
    return copy;
  }

  return function transitions (zoneName, consumer) {
    // We `concat` because someday, we'll read right out of the database and the
    // `concat` will be our defensive copy.
    var table = []
      , zone = begins(data.zones[zoneName]).concat({ offset: "0" })
      , entry = zone.shift()
      , previous, offset, save = 0, wallclock, posix, rules;

    table.push(entry);

    for (var i = 0, length = zone.length; i < Math.min(13, length); i++) {
      previous = entry;
      entry = zone[i];

      previous.abbrev = previous.format;

      if (previous.rules) {
        if (!(previous.save = parseOffset(previous.rules))) {
          previous = walk(previous, entry, table); // previous is last rule, not last zone.
        }
      } else {
        previous.save = 0;
      }

      setClocks(entry, previous);

      table.push(entry);
    }
    return table.reverse();
  }
})();

(function () {
  function pad (value) { return ('00' + value).slice(-2) }
  function formatOffset (offset) {
    var increment = offset / Math.abs(offset);
    var sign = offset < 0 ? '-' : '+';
    var millis, seconds, minutes, hours;
    offset = Math.abs(offset);
    offset -= (millis = offset % 1000);
    offset /= 1000;
    offset -= (seconds = offset % 60);
    offset /= 60;
    offset -= (minutes = offset % 60);
    hours = offset / 60;
    return sign + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }
  function iso8601 (date) {
    return new Date(date).toISOString().replace(/\..*$/, "");
  }
  function format(entry) {
    if (! entry.abbrev) entry.abbrev = entry.format;
    return formatOffset(entry.offset + (entry.save || 0)) + '/' + entry.abbrev;
  }
  var set = process.argv[2] ? [ process.argv[2] ] : Object.keys(data.zones).filter(function (e) { return /^A/.test(e) });
  for (var i = 0, length = set.length; i < length; i++) {
    try {
      var table = transitions(set[i], function (entry, posix, wallclock) {
        entry.posix = posix;
        entry.wallclock = wallclock;
      });
      for (var j = 1, stop = table.length - 1; j < stop; j++) {
        entry = table[j];
        say("%s %s %s %s", set[i], iso8601(entry.wallclock), iso8601(entry.posix), format(table[j + 1]), format(table[j]));
      }
    } catch (e) {
      say("Failed on " + set[i] + ".");
      throw e;
    }
  }
})();
