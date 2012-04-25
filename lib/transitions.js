(function () {
  var ABBREV = "Sun Mon Tue Wed Thu Fri Sat".split(/\s/);

  function actualize (entry, rule, year, ruleIndex) {
    time = rule.time * 6e4;
    var date = /^(?:(\d+)|last(\w+)|(\w+)>=(\d+))$/.exec(rule.day);
    var fields;
    if (date[1]) {
      fields = new Date(Date.UTC(year, rule.month, parseInt(date[1], 10)));
    } else if (date[2]) {
      for (var i = 0, stop = ABBREV.length; i < stop; i++)
        if (ABBREV[i] === date[2]) break;
      // Remember that month is zero for Date.UTC.
      var day = new Date(Date.UTC(year, (rule.month + 1) % 12, 1) - 1).getUTCDate();
      // Asia/Amman springs forward at 24:00. We calculate the day without the
      // hour, so the hour doesn't push the day into tomorrow. If you're tempted
      // to create the full date in the loop, Amman says no.
      while ((fields = new Date(Date.UTC(year, rule.month, day))).getUTCDay() != i) day--;
    } else {
      var min = parseInt(date[4], 10);
      for (var i = 0, stop = ABBREV.length; i < stop; i++)
        if (ABBREV[i] === date[3]) break;
      day = 1;
      for (;;) {
        fields = new Date(Date.UTC(year, rule.month, day));
        if (fields.getUTCDay() === i && fields.getUTCDate() >= min) break;
        day++;
      }
    }

    var save = rule.save * 6e4;

    var offset = entry.offset;

    var sortable = fields.getTime();

    var actualized =  {
      clock: rule.clock,
      entry: entry,
      sortable: sortable,
      rule:rule,
      year: year,
      save: save,
      ruleIndex: ruleIndex,
      offset: offset
    };

    actualized[actualized.clock] = fields.getTime() + time;

    return actualized;
  }

  function setClocks (record, effective) {
    switch (record.clock) {
    case "posix":
      record.standard = record.posix + effective.offset;
      record.wallclock = record.posix + effective.offset + effective.save;
      break;
    case "wallclock":
      record.posix = record.wallclock - effective.offset - effective.save;
      record.standard = record.wallclock + effective.save;
      break;
    case "standard":
      record.posix = record.standard - effective.offset;
      record.wallclock = record.standard + effective.save;
      break;
    }
    return record;
  }

  function getYear (time) { return new Date(time).getUTCFullYear() }

  function pushRule (table, entry, actual, abbrevs) {
    var save = actual.save
      , abbrev = abbrevs[save ? 1 : 0] || entry.format.replace(/%s/, function () { return actual.rule.letter });
    table.push({
      actualization: true,
      offset: entry.offset,
      abbrev: abbrev,
      clock: actual.clock,
      wallclock: actual.wallclock,
      posix: actual.posix,
      standard: actual.standard,
      save: actual.save
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
        // TODO What does offset do?
        if (!(offset = rules[j].save * 6e4)) {
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
          if (!(offset = rules[j].save * 6e4)) {
            begin.abbrev = abbrevs[0] || begin.format.replace(/%s/, function () { return rules[j].letter });
            break;
          }
        }
      } else {
        begin.save = actualized[i - 1].save;
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
        if (typeof previous.rules == "number") {
          previous.save = previous.rules * 6e4;
        } else {
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
