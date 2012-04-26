new function() {
  var __slice = [].slice;
  var UTC, actualize, adjust, append, convert, convertToPOSIX, convertToWallclock, daysInMonth, die, en_US, extend, format, isLeapYear, iso8601, makeDate, offsetInMilliseconds, parse, parseAdjustment, say, search, tz, zoneinfo;
  die = function() {
    console.log.apply(console, __slice.call(arguments, 0));
    return process.exit(1);
  };
  say = function() { return console.log.apply(console, __slice.call(arguments, 0)) }
  UTC = [ { "offset": "0", "format": "UTC" } ];
  UTC.name = "UTC";
  en_US = {
    name: "en_US",
    day: {
      abbrev: "Sun Mon Tue Wed Thu Fri Sat".split(/\s/),
      full: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(/\s+/)
    },
    month: {
      abbrev: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(/\s+/),
      full: "January February March\nApril   May      June\nJuly    August   September\nOctober November December".split(/\s+/)
    },
    dateFormat: "%m/%d/%Y",
    timeFormat: "%I:%M:%S %p",
    dateTimeFormat: "%a %d %b %Y %I:%M:%S %p %Z",
    meridiem: [
      {
        lower: "am",
        upper: "AM"
      }, {
        lower: "pm",
        upper: "PM"
      }
    ],
    monthBeforeDate: true
  };
  var CLOCK = function() { return +(new Date()) }
    , SECOND = 1000
    , MINUTE = SECOND * 60
    , HOUR = MINUTE * 60
    , DAY = HOUR * 24
    ;
  function isLeapYear (year) { return new Date(year, 1, 29).getDate() == 29 }
  function daysInMonth (month, year) { new Date(Date.UTC(year, month % 12, 1) - 1).getDate() }

  var MONTH_DAY_OF_YEAR, ch, dialHours, flag, isoWeek, pad, padding, paddings, recurse, specifiers, splitOffset, transforms, weekOfYear, _ref;
  MONTH_DAY_OF_YEAR = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
  weekOfYear = function(date, startOfWeek) {
    var day, diff, fields, nyd, remaining, week, weekStart;
    fields = [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()];
    date = new Date(Date.UTC.apply(Date.UTC, fields));
    nyd = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    diff = (date.getTime() - nyd.getTime()) / DAY;
    day = date.getUTCDay();
    if (nyd.getUTCDay() === startOfWeek) {
      weekStart = 0;
    } else {
      weekStart = 7 - nyd.getUTCDay() + startOfWeek;
      if (weekStart === 8) {
        weekStart = 1;
      }
    }
    remaining = diff - weekStart;
    week = 0;
    if (diff >= weekStart) {
      week++;
      diff -= weekStart;
      week += Math.floor(diff / 7);
    }
    return week;
  };
  isoWeek = function(date) {
    var ny, nyd, nyy, offset, week;
    nyy = date.getUTCFullYear();
    nyd = new Date(Date.UTC(nyy, 0, 1)).getUTCDay();
    offset = nyd > 1 && nyd <= 4 ? 1 : 0;
    week = weekOfYear(date, 1) + offset;
    if (week === 0) {
      ny = new Date(Date.UTC(date.getUTCFullYear() - 1, 0, 1));
      nyd = ny.getUTCDay();
      nyy = ny.getUTCFullYear();
      week = nyd === 4 || (nyd === 3 && isLeapYear(nyy)) ? 53 : 52;
      return [week, date.getUTCFullYear() - 1];
    } else if (week === 53 && !(nyd === 4 || (nyd === 3 && isLeapYear(nyy)))) {
      return [1, date.getUTCFullYear() + 1];
    } else {
      return [week, date.getUTCFullYear()];
    }
  }
  function dialHours (date) {
    var hours = date.getUTCHours() % 12;
    return hours == 0 ? 12 : hours;
  }
  function recurse (request) {
    return convert.call(null, null, request, __slice.call(arguments, 1).concat([request.zone, request.locale]), 0)
  }
  splitOffset = function(offset) {
    var hours, millis, minutes, seconds;
    offset = Math.abs(offset);
    offset -= (millis = offset % 1000);
    offset /= 1000;
    offset -= (seconds = offset % 60);
    offset /= 60;
    offset -= (minutes = offset % 60);
    hours = offset / 60;
    return [hours, minutes, seconds, millis];
  };
  specifiers = {
    a: function(date, locale) {
      return locale.day.abbrev[date.getUTCDay()];
    },
    A: function(date, locale) {
      return locale.day.full[date.getUTCDay()];
    },
    d: function(date) {
      return date.getUTCDate();
    },
    e: function(date) {
      return date.getUTCDate();
    },
    j: function(date) {
      var days, month;
      month = date.getUTCMonth();
      days = MONTH_DAY_OF_YEAR[month];
      if (month > 2 && isLeapYear(date.getUTCFullYear())) {
        days++;
      }
      days += date.getUTCDate() - 1;
      return days;
    },
    u: function(date) {
      var day;
      day = date.getUTCDay();
      if (day === 0) {
        day = 7;
      }
      return day;
    },
    w: function(date) {
      return date.getUTCDay();
    },
    U: function(date) {
      return weekOfYear(date, 0);
    },
    W: function(date) {
      return weekOfYear(date, 1);
    },
    V: function(date) {
      var iso;
      return iso = isoWeek(date)[0];
    },
    G: function(date) {
      var iso;
      return iso = isoWeek(date)[1];
    },
    g: function(date) {
      var iso;
      return iso = isoWeek(date)[1] % 100;
    },
    m: function(date) {
      return date.getUTCMonth() + 1;
    },
    h: function(date, locale) {
      return locale.month.abbrev[date.getUTCMonth()];
    },
    b: function(date, locale) {
      return locale.month.abbrev[date.getUTCMonth()];
    },
    B: function(date, locale) {
      return locale.month.full[date.getUTCMonth()];
    },
    y: function(date) {
      return date.getUTCFullYear() % 100;
    },
    Y: function(date) {
      return date.getUTCFullYear();
    },
    C: function(date) {
      // TODO BROKEN!
      return Math.floor(date.getFullYear() / 100);
    },
    D: function(date) {
      return tz(date.getTime(), "%m/%d/%y");
    },
    x: function(date, locale, request) {
      var posix;
      posix = convertToPOSIX(request, date.getTime());
      return recurse(request, posix, locale.dateFormat);
    },
    F: function(date) {
      return tz(date.getTime(), "%Y-%m-%d");
    },
    l: function(date) {
      return dialHours(date);
    },
    I: function(date) {
      return dialHours(date);
    },
    k: function(date) {
      return date.getUTCHours();
    },
    H: function(date) {
      return date.getUTCHours();
    },
    P: function(date, locale) {
      return locale.meridiem[Math.floor(date.getUTCHours() / 12)].lower;
    },
    p: function(date, locale) {
      return locale.meridiem[Math.floor(date.getUTCHours() / 12)].upper;
    },
    M: function(date) {
      return date.getUTCMinutes();
    },
    s: function(date) {
      return Math.floor(date.getTime() / 1000);
    },
    S: function(date) {
      return date.getUTCSeconds();
    },
    N: function(date) {
      return (date.getTime() % 1000) * 1000000;
    },
    r: function(date) {
      return tz(date.getTime(), "%I:%M:%S %p");
    },
    R: function(date) {
      return tz(date.getTime(), "%H:%M");
    },
    T: function(date) {
      return tz(date.getTime(), "%H:%M:%S");
    },
    X: function(date, locale, request) {
      var posix;
      posix = convertToPOSIX(request, date.getTime());
      return recurse(request, posix, locale.timeFormat);
    },
    c: function(date, locale, request) {
      var posix;
      posix = convertToPOSIX(request, date.getTime());
      return recurse(request, posix, locale.dateTimeFormat);
    },
    z: function(date, locale, request, delimiters) {
      var offset, part, parts;
      offset = request.entry.offset;
      parts = (function() {
        var _i, _len, _ref, _results;
        _ref = splitOffset(offset);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          part = _ref[_i];
          _results.push(pad(part, 2, "0"));
        }
        return _results;
      })();
      if (offset < 0) {
        parts[0] = "-" + parts[0];
      }
      if (delimiters) {
        switch (delimiters.length) {
          case 1:
            return parts.slice(0, 2).join(":");
          case 2:
            return parts.slice(0, 3).join(":");
          default:
            if (parts[2] !== "00") {
              return parts.slice(0, 3).join(":");
            } else if (parts[1] !== "00") {
              return parts.slice(0, 2).join(":");
            } else {
              return parts[0];
            }
        }
      } else {
        return parts.slice(0, 2).join("");
      }
    },
    Z: function(date, locale, request) {
      var _ref;
      return ((_ref = request.entry) != null ? _ref.abbrev : void 0) || "UTC";
    }
  };
  padding = {
    d: 2,
    U: 2,
    W: 2,
    V: 2,
    g: 2,
    m: 2,
    j: 3,
    C: 2,
    I: 2,
    H: 2,
    k: 2,
    M: 2,
    S: 2,
    N: 9,
    y: 2
  };
  paddings = {
    "-": function(number) {
      return number;
    }
  };
  _ref = {
    "_": " ",
    "0": "0"
  };
  for (flag in _ref) {
    ch = _ref[flag];
    paddings[flag] = (function(ch) {
      return function(number, count) {
        return pad(number, count, ch);
      };
    })(ch);
  }
  pad = function(number, count, char) {
    var string;
    string = String(number);
    return "" + (new Array((count - string.length) + 1).join(char)) + string;
  };
  transforms = {
    none: function(value) {
      return value;
    },
    "^": function(value) {
      return value.toUpperCase();
    }
  };
  function format(request, wallclock, rest) {
    var date, delimiters, flags, locale, match, output, prefix, specifier, style, transform, value, _ref1;
    date = new Date(wallclock);
    output = [];
    locale = request.locales[request.locale];
    while (rest.length) {
      match = /^(.*?)%(?:%|(?:([-0_^]?)|(\:{0,3}))([aAcdDeFHIjklMNpPsrRSTuwXUWVmhbByYcGgCxzZ]))(.*)$/.exec(rest);
      if (match) {
        _ref1 = match.slice(1), prefix = _ref1[0], flags = _ref1[1], delimiters = _ref1[2], specifier = _ref1[3], rest = _ref1[4];
        if (specifier) {
          value = specifiers[specifier](date, locale, request, delimiters);
          if (padding[specifier]) {
            style = specifier === "k" ? "_" : "0";
            if (flags) {
              if (paddings[flags[0]]) {
                style = flags[0];
              }
            }
            value = paddings[style](value, padding[specifier]);
          }
          transform = transforms.none;
          if (flags != null) {
            transform = transforms[flags[0]] || transform;
          }
          value = transform(value);
          if (prefix != null) {
            output.push(prefix);
          }
          output.push(value);
        } else {
          output.push("%");
        }
      } else if (rest.length) {
        output.push(rest);
        rest = "";
      }
    }
    return output.join("");
  };
  var zeroUnless;
  zeroUnless = function(date, value) {
    if (value != null) {
      return date.push(parseInt(value, 10));
    } else {
      return date.push(0);
    }
  };
  function makeDate(year, month, day, hours, minutes, seconds, milliseconds) {
    var date, now;
    date = [];
    if (!(year != null)) {
      now = new Date(CLOCK());
      date.push(now.getUTCFullYear());
    } else {
      date.push(parseInt(year, 10));
    }
    if (!(month != null)) {
      if (!(year != null)) {
        date.push(now.getUTCMonth());
      } else {
        date.push(0);
      }
    } else {
      date.push(parseInt(month, 10) - 1);
    }
    if (!(day != null)) {
      if (!(month != null)) {
        date.push(now.getUTCDate());
      } else {
        date.push(1);
      }
    } else {
      date.push(parseInt(day, 10));
    }
    zeroUnless(date, hours);
    zeroUnless(date, minutes);
    zeroUnless(date, seconds);
    zeroUnless(date, milliseconds);
    return Date.UTC.apply(Date.UTC, date);
  };
  parse = function(request, pattern) {
    var abbrev, after, before, date, day, dow, hours, i, match, milliseconds, minutes, month, num, offset, posix, remaining, seconds, time, wallclock, year, zone, zoneOffset, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    if (match = /^(.*?)(\w{3}),\s+(\d{1,2})\s+(\w{3})\s+(\d{2,4})\s+(\d{2}):(\d{2})(?::(\d{2}))?\s*(?:([A-IK-Z]|UT|GMT|[ECMP][SD]T)|([-+]?\d{4}))?(.*)$/i.exec(pattern)) {
      _ref = match.slice(1), before = _ref[0], dow = _ref[1], day = _ref[2], month = _ref[3], year = _ref[4], hours = _ref[5], minutes = _ref[6], seconds = _ref[7], zone = _ref[8], offset = _ref[9], after = _ref[10];
      dow = dow.toLowerCase();
      _ref1 = request.locales[request.locale].day.abbrev;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        abbrev = _ref1[_i];
        if (dow === abbrev.toLowerCase()) {
          dow = null;
          break;
        }
      }
      if (dow) {
        throw new Error("bad weekday");
      }
      month = month.toLowerCase();
      _ref2 = request.locales[request.locale].month.abbrev;
      for (i = _j = 0, _len1 = _ref2.length; _j < _len1; i = ++_j) {
        abbrev = _ref2[i];
        if (month === abbrev.toLowerCase()) {
          month = i;
          break;
        }
      }
      if (typeof month === "string") {
        throw new Error("bad month");
      }
      seconds || (seconds = "0");
      offset || (offset = "0");
      _ref3 = (function() {
        var _k, _len2, _ref3, _results;
        _ref3 = [day, year, hours, minutes, seconds, offset];
        _results = [];
        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
          num = _ref3[_k];
          _results.push(parseInt(num, 10));
        }
        return _results;
      })(), day = _ref3[0], year = _ref3[1], hours = _ref3[2], minutes = _ref3[3], seconds = _ref3[4], offset = _ref3[5];
      wallclock = makeDate(year, month + 1, day, hours, minutes, seconds, 0);
      if (offset) {
        posix = wallclock - Math.floor(offset / 100) * HOUR;
      } else {
        posix = convertToPOSIX(request, wallclock);
      }
      return posix;
    }
    if (match = /^(.*?)(?:(\d\d\d\d)-(\d\d)(?:-(\d{2}))?|(\d{4})(\d{2})(\d{2})?)(?:(?:\s+|T)(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?)?(?:(?:\s+|Z)([+-]\d{2}(?::?\d{2})?))?(.*)$/.exec(pattern)) {
      before = match.splice(0, 2).pop();
      date = match.splice(0, 3);
      if (date[0] != null) {
        year = date[0], month = date[1], day = date[2];
      }
      date = match.splice(0, 3);
      if (date[0] != null) {
        year = date[0], month = date[1], day = date[2];
      }
      time = match.splice(0, 4);
      if (time[0] != null) {
        hours = time[0], minutes = time[1], seconds = time[2], milliseconds = time[3];
      }
      zone = match.shift();
      if (zone != null) {
        zoneOffset = offsetInMilliseconds(zone);
      }
      after = match.pop();
      remaining = (before + after).replace(/\s+/, "").length;
      if (remaining === 0) {
        wallclock = makeDate(year, month, day, hours, minutes, seconds, milliseconds);
        return convertToPOSIX(request, wallclock);
      }
    }
  };
  offsetInMilliseconds = function(pattern) {
    var hours, match, minutes, number, offset, seconds, sign, _ref;
    match = /^(-?)(\d+)(?::(\d+))?(?::(\d+))?$/.exec(pattern).slice(1);
    match[0] += "1";
    _ref = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = match.length; _i < _len; _i++) {
        number = match[_i];
        _results.push(parseInt(number || "0", 10));
      }
      return _results;
    })(), sign = _ref[0], hours = _ref[1], minutes = _ref[2], seconds = _ref[3];
    offset = hours * HOUR;
    offset += minutes * MINUTE;
    offset += seconds * SECOND;
    offset *= sign;
    return offset;
  };
  actualize = function(request, rule, year) {
    var date, day, fields, hours, i, index, match, min, minutes, month, number, posix, seconds, sortable, wallclock, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    match = /^(\d+):(\d+)(?::(\d+))?u?$/.exec(rule.time).slice(1);
    _ref = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = match.length; _i < _len; _i++) {
        number = match[_i];
        _results.push(parseInt(number || 0, 10));
      }
      return _results;
    })(), hours = _ref[0], minutes = _ref[1], seconds = _ref[2];
    match = /^(?:(\d+)|last(\w+)|(\w+)>=(\d+))$/.exec(rule.day);
    if (match[1]) {
      _ref1 = [rule.month, parseInt(match[1], 10)], month = _ref1[0], day = _ref1[1];
      date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
    } else if (match[2]) {
      _ref2 = en_US.day.abbrev;
      for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
        day = _ref2[i];
        if (day === match[2]) {
          index = i;
          break;
        }
      }
      day = daysInMonth(rule.month, year);
      while (true) {
        date = new Date(Date.UTC(year, rule.month, day, hours, minutes, seconds));
        if (date.getUTCDay() === index) {
          break;
        }
        day--;
      }
    } else {
      min = parseInt(match[4], 10);
      _ref3 = en_US.day.abbrev;
      for (i = _j = 0, _len1 = _ref3.length; _j < _len1; i = ++_j) {
        day = _ref3[i];
        if (day === match[3]) {
          index = i;
          break;
        }
      }
      day = 1;
      while (true) {
        date = new Date(Date.UTC(year, rule.month, day, hours, minutes, seconds));
        if (date.getUTCDay() === index && date.getUTCDate() >= min) {
          break;
        }
        day++;
      }
    }
    if (/u$/.test(rule.time)) {
      fields = new Date(date.getTime() + offsetInMilliseconds(request.entry.offset) + offsetInMilliseconds(rule.save));
      posix = date.getTime();
    } else {
      wallclock = date.getTime();
      fields = new Date(wallclock);
    }
    sortable = fields.getUTCFullYear() * 10000 + fields.getUTCMonth() * 100 + fields.getUTCDate();
    return {
      sortable: sortable,
      rule: rule,
      wallclock: wallclock,
      year: year,
      posix: posix
    };
  };
  iso8601 = function(date) {
    return new Date(date).toISOString().replace(/\..*$/, "");
  };
  search = function(zone, clock, milliseconds) {
    var compare, high, low, mid;
    low = 1;
    high = zone.length - 1;
    while (low <= high) {
      mid = low + ((high - low) >>> 1);
      compare = milliseconds - zone[mid][clock];
      if (compare > 0) {
        low = mid + 1;
      } else if (compare < 0) {
        high = mid - 1;
      } else {
        return mid;
      }
    }
    return low - 1;
  };
  convertToWallclock = function(request, posix) {
    var index, zone;
    if (request.zone === "UTC") {
      return posix;
    }
    zone = request.zones[request.zone];
    index = search(zone, "posix", posix);
    request.entry = zone[index];
    return posix + request.entry.offset;
  };
  convertToPOSIX = function(request, wallclock) {
    var diff, entry, zone;
    if (request.zone === "UTC") {
      return wallclock;
    }
    zone = request.zones[request.zone];
    request.entry = entry = zone[search(zone, "wallclock", wallclock)];
    diff = wallclock - entry.wallclock;
    if ((0 < diff && diff < entry.save)) {
      return null;
    } else {
      return wallclock - entry.offset;
    }
  };

  var UNITS = "sunday|monday|tuesday|wednesday|thursday|friday|saturday|year|month|day|hour|minute|second|milli|millisecond"
    , UNIT_RE = new RegExp("^\\s*([+-])(\\d+)\\s+(" + UNITS + ")s?\\s*$", "i")
    , TIME = [ 36e5, 6e4, 1e3, 1, 1 ]
    ;

  UNITS = UNITS.split("|");

  function parseAdjustment (pattern) {
    var match = UNIT_RE.exec(pattern);
    return match && function (request, posix) { return adjust(request, posix, match[1], match[2], match[3]) }
  };

  function adjust (request, posix, sign, count, unit) {
    var increment = parseInt(sign + 1)
      , offset = parseInt(count, 10) * increment
      , index = UNITS.indexOf(unit.toLowerCase())
      ;
    if (index > 9) {
      posix += offset * TIME[index - 10];
    } else {
      var date = new Date(convertToWallclock(request, posix));
      if (index < 7) {
        while (offset != 0) {
          date.setUTCDate(date.getUTCDate() + increment);
          if (date.getUTCDay() == index) offset -= increment;
        }
      } else if (index == 7) {
        date.setUTCFullYear(date.getUTCFullYear() + offset);
      } else if (index == 8) {
        date.setUTCMonth(date.getUTCMonth() + offset);
      } else {
        date.setUTCDate(date.getUTCDate() + offset);
      }
      if ((posix = convertToPOSIX(request, date.getTime())) == null) {
        posix = convertToPOSIX(request, date.getTime() + DAY * increment) - DAY * increment;
      }
    }
    return posix;
  };

  function extend (to, from) {
    for (var key in from) to[key] = from[key];
    return to;
  };

  function append (context, request, value, key) {
    request[key] || (request[key] = extend({}, context[key]));
    return extend(request[key], value);
  };

  function zoneinfo (zones, table) {
    var name = table.shift(), offset = table.shift(), abbrevs = [], zone = [];
    while (typeof table[0] != "number") abbrevs.push(table.shift());
    for (var i = 0, I = Math.floor(table.length / 4); i < I; i++) {
      var j = i * 4;
      zone.push(entry = {
        posix: Math.round(table[j] * 1000 * 100),
        wallclock: Math.round((table[j] - table[j + 1]) * 1000 * 100),
        save: Math.round(table[j + 2] * 1000 * 60 * 10),
        abbrev: abbrevs[table[j + 3]],
        offset: offset
      });
      offset = entry.wallclock - entry.posix;
    }
    zone.push({
      posix: Number.MIN_VALUE,
      wallclock: Number.MIN_VALUE,
      save: 0,
      abbrev: abbrevs[table.pop()],
      offset: offset
    });
    return zones[name] = zone.reverse();
  }
  convert = function(tz, context, splat, length) {
    if (splat.length == length) return context.clock();

    var adjustment, argument, count, date, index, key, object, partial, posix, request, token, type;
    var request = {}
      , adjustments = []
      ;
    date = null;
    index = 0;
    partial = [];

    // TODO Eliminate or= by reversing array?
    while (splat.length) {
      partial.push(argument = splat.shift());
      type = typeof argument;
      if (type === "number" && index === length) {
        request.date = argument;
      } else if (type === "string") {
        if (~argument.indexOf("%")) {
          request.format || (request.format = argument);
        } else if (/^\w{2}_\w{2}$/.test(argument)) {
          request.locale || (request.locale = argument);
        } else if (adjustment = parseAdjustment(argument)) {
          adjustments.push(adjustment);
        } else if (context.zones[argument]) {
          request.zone || (request.zone = argument);
        } else if (index === length) {
          request.date = argument;
        }
      } else if (type === "function") {
        argument(request);
      } else if (Array.isArray(argument)) {
        if (index === length && typeof argument[0] === "number") {
          request.date = argument;
        } else {
          for (_i = 0, _len = argument.length; _i < _len; _i++) {
            object = argument[_i];
            splat.unshift(object);
          }
        }
      } else if (type === "object") {
        if (/^\w{2}_\w{2}$/.test(argument.name)) {
          partial.pop();
          append(context, request, {}, "locales");
          request.locales[argument.name] = argument;
        } else if (argument.z) {
          partial.pop();
          append(context, request, {}, "zones");
          zoneinfo(request.zones, argument.z);
        }
      }
      index++;
    }

    request.zones || (request.zones = context.zones);
    request.locales || (request.locales = context.locales);
    request.clock || (request.clock = context.clock);

    if ((date = request.date) != null) {
      request.locale || (request.locale = "en_US");
      request.zone || (request.zone = "UTC");
      request.entry = UTC[0];

      if (!request.locales[request.locale]) throw new Error("unknown locale");

      if (typeof date === "string") {
        if ((posix = parse(request, date)) == null) {
          throw new Error("invalid date");
        }
      } else if (typeof date === "number") {
        posix = date;
      }

      for (var i = 0, I = adjustments.length; i < I; i++) {
        posix = adjustments[i](request, posix);
      }

      if (request.format) {
        token = format(request, convertToWallclock(request, posix), request.format);
      } else {
        token = posix;
      }
    } else {
      token = function() {
        return convert(token, request, partial.concat(__slice.call(arguments, 0)), partial.length);
      };
    }
    return token;
  };
  exports.tz = tz = (function() {
    var context =
      { zones: { UTC: UTC }
      , rules: {}
      , locales: { en_US: en_US }
      , clock: CLOCK
      };
    return function() {
      return convert(tz, context, __slice.call(arguments, 0), 0);
    };
  })();
}
