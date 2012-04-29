var DAY, HOUR, MINUTE, MONTH, base, clock, date, day, file, from, fs, getDate, hour, i, info, letter, line, minute, month, name, parseOffset, record, save, second, time, to, type, zone, _base, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _ref4;

fs = require("fs");

MONTH = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(/\s+/);

DAY = "Sun Mon Tue Wed Thu Fri Sat".split(/\s+/);

MINUTE = 60 * 1000;

HOUR = MINUTE * 60;

function parseOffset (pattern, seconds) {
  var i, match, milliseconds, offset = 0;
  if (pattern == "0") pattern = "0:00";
  match = /^(-?)(\d+)(?::(\d+))?(?::(\d+))?$/.exec(pattern);
  if (!match) throw new Error("pattern: " + pattern);
  if (!seconds && match[4]) throw new Error("" + pattern + " " + match[3]);
  match[1] += '1';
  for (i = 1; i < 5; i++) match[i] = parseInt(match[i] || 0, 10);
  milliseconds = [ 36e5, 6e4, 1e3 ];
  for (i = 0; i < 3; i++) offset += match[i + 2] * milliseconds[i];
  return offset * match[1];
}

getDate = function(month, day) {
  var date, last, least, match, _ref, _ref1;
  if (match = /^last(.*)$/.exec(day)) {
    _ref = [month, DAY.indexOf(match[1])], date = _ref[0], day = _ref[1], last = _ref[2];
    while (date.getUTCMonth() === month.getUTCMonth()) {
      if (date.getUTCDay() === day) {
        last = date;
      }
      date = new Date(date.getTime() + 24 * HOUR);
    }
    return last;
  } else if (match = /^first(.*)$/.exec(day)) {
    return getDate(year, month, "" + match[1] + ">=1}");
  } else if (match = /^(\w+)>=(\d+)$/.exec(day)) {
    _ref1 = [month, DAY.indexOf(match[1]), parseInt(match[2], 10)], date = _ref1[0], day = _ref1[1], least = _ref1[2];
    while (date.getUTCDate() < least) {
      date.setUTCDate(date.getUTCDate() + 1);
    }
    while (date.getUTCDay() !== day) {
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return date;
  } else {
    month.setUTCDate(parseInt(day, 10));
    return month;
  }
};

file = process.argv[2]
info = {
  rules: {},
  zones: {}
};
base = file.replace(/^.*\/(.*)$/, "$1");
name = null;
_ref1 = fs.readFileSync(file, "utf8").split(/\n/);
for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
  line = _ref1[_j];
  line = line.trim();
  if (line === "" || /^\s*#/.test(line)) {
    continue;
  }
  line = line.replace(/\s*#.*$/, "");
  record = line.split(/\s+/);
  switch (record[0]) {
    case "Rule":
      _ref2 = record.slice(1), name = _ref2[0], from = _ref2[1], to = _ref2[2], type = _ref2[3], month = _ref2[4], day = _ref2[5], time = _ref2[6], save = _ref2[7], letter = _ref2[8];
      if (type !== "-") {
        console.log(type);
      }
      if (time === "0") {
        time = "0:00";
      }
      clock = (function() {
        switch (time[time.length - 1]) {
          case "s":
            return "standard";
          case "g":
          case "u":
          case "z":
            return "posix";
          default:
            return "wallclock";
        }
      })();
      time = time.replace(/[suzgw]$/, '');
      time = /^(\d+):(\d+)(?::(\d+))?$/.exec(time).slice(1);
      if (time[2]) {
        throw new Error(time);
      }
      for (i = _k = 0; _k <= 1; i = ++_k) {
        time[i] = parseInt(time[i] || 0, 10);
      }
      time = time[0] * 60 + time[1];
      (_base = info.rules)[name] || (_base[name] = []);
      info.rules[name].push({
        from: parseInt(from, 10),
        to: (function() {
          switch (to) {
            case "only":
              return parseInt(from, 10);
            case "max":
              return Number.MAX_VALUE;
            default:
              return parseInt(to, 10);
          }
        })(),
        month: MONTH.indexOf(month),
        day: day,
        time: time,
        clock: clock,
        save: parseOffset(save) / 6e4,
        letter: letter === "-" ? "" : letter
      });
      break;
    case "Link":
      break;
    default:
      if (record[0] === "Zone") {
        name = record[1];
        info.zones[name] = [];
        record = record.slice(2);
      }
      info.zones[name].push({
        offset: parseOffset(record[0], true) / 1000,
        rules: record[1],
        format: record[2],
        until: record.slice(3)
      });
  }
}

_ref3 = info.zones;
for (name in _ref3) {
  zone = _ref3[name];
  zone.reverse();
  for (_l = 0, _len2 = zone.length; _l < _len2; _l++) {
    record = zone[_l];
    record.clock = "wallclock";
    if (record.rules === "-") {
      record.rules = false;
    } else if (/^\d+:\d+$/.test(record.rules)) {
      record.rules = parseOffset(record.rules) / 6e4;
    }
    if (record.until.length) {
      date = new Date(Date.UTC(parseInt(record.until.shift(), 10), MONTH.indexOf(record.until.shift() || "Jan")));
      if (record.until.length) {
        date = getDate(date, record.until.shift());
        if (record.until.length) {
          _ref4 = /^(\d+):(\d+)(?::(\d+))?(s|w|g|u|z)?$/.exec(record.until.shift()).slice(1), hour = _ref4[0], minute = _ref4[1], second = _ref4[2], type = _ref4[3];
          date.setUTCHours(parseInt(hour, 10));
          date.setUTCMinutes(parseInt(minute, 10));
          if (second != null) {
            date.setUTCSeconds(parseInt(minute, 10));
          }
          record.clock = (function() {
            switch (type) {
              case "s":
                return "standard";
              case "g":
              case "u":
              case "z":
                return "posix";
              default:
                return "wallclock";
            }
          })();
        }
      }
      record.until = date.getTime() / 1000;
    } else {
      record.until = false;
    }
  }
}

process.stdout.write("module.exports = ");
process.stdout.write(JSON.stringify(info, null, 2));
process.stdout.write("\n");
