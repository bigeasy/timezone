(function () {
  var SECOND = 1000, MINUTE = SECOND * 60, HOUR = MINUTE * 60, DAY = HOUR * 24;
  var ABBREV = "Sun Mon Tue Wed Thu Fri Sat".split(/\s/);

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
      for (var i = 0, stop = ABBREV.length; i < stop; i++)
        if (ABBREV[i] === date[2]) break;
      var day = daysInMonth(rule.month, year);
      // Asia/Amman springs forward at 24:00. We calculate the day without the
      // hour, so the hour doesn't push the day into tomorrow. If you're tempted
      // to create the full date in the loop, Amman says no.
      while (new Date(year, rule.month, day).getDay() != i) day--;
      // Now add the hours, and Amman will push this to the next day.
      fields = new Date(Date.UTC(year, rule.month, day, hours, minutes, seconds));
    } else {
      var min = parseInt(date[4], 10);
      for (var i = 0, stop = ABBREV.length; i < stop; i++)
        if (ABBREV[i] === date[3]) break;
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

  function walk (data, begin, end, table) {
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

    // TODO Combine with below.
    if (i == length) {
      var rules = data.rules[begin.rules], offset;
      for (var j = 0; j < rules.length; j++) {
        if (!(offset = parseOffset(rules[j].save || "0"))) {
          begin.abbrev = abbrevs[0] || begin.format.replace(/%s/, function () { return rules[j].letter });
          break;
        }
      }
      return begin;
    }

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
    return table[table.length - 1];
  }

  // TODO Push this to tz2json.
  function begins (zone) {
    var copy = [];
    for (var i = zone.length - 2; i >= 0; --i) {
      copy[i] = {
        rules: zone[i].rules,
        format: zone[i].format,
        offset: zone[i].offset * 1000,
        save: 0,
        clock: zone[i + 1].clock
      };
      copy[i][copy[i].clock] = zone[i + 1].until === false ? Number.MAX_VALUE : zone[i + 1].until * 1000;
    }

    copy.push({
      offset: zone[zone.length - 1].offset * 1000,
      format: zone[zone.length - 1].format,
      save: 0
    });

    copy.reverse();
    copy[0].posix = copy[0].wallclock = Number.MIN_VALUE;
    copy.forEach(function (e) { e.begins =  iso8601(e[e.clock]) + " " + e.clock });
    return copy;
  }

  module.exports = function (data, zoneName) {
    // We `concat` because someday, we'll read right out of the database and the
    // `concat` will be our defensive copy.
    var table = []
      , zone = begins(data.zones[zoneName]).concat({ offset: 0 })
      , entry = zone.shift()
      , previous, offset, save = 0, wallclock, posix, rules;

    table.push(entry);

    for (var i = 0, length = zone.length; i < Math.min(13, length); i++) {
      previous = entry;
      entry = zone[i];

      previous.abbrev = previous.format;

      if (previous.rules) {
        if (!(previous.save = parseOffset(previous.rules))) {
          previous = walk(data, previous, entry, table); // previous is last rule, not last zone.
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
