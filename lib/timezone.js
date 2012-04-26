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

  function makeDate (request, date) {
    var z;
    if (~(z = date.indexOf('+')) || ~(z = date.indexOf('-'))) {
      date[z] += 1;
      if (z < 5) date = recurse(request, recurse(request), "%Y-%m-%d").split(/-/).concat(date);
    } else {
      date[z = date.length] = "+1"; 
    }
    for (var i = 0, I = date.length; i < I; i++) {
      date[i] = parseInt(date[i] || 0, 10);
    }
    --date[1];
    var posix = Date.UTC.apply(Date.UTC, date.slice(0, z));
    posix += (date[z] * (date[z + 1] || 0) * 36e5);
    posix += (date[z] * (date[z + 2] || 0) * 6e4);
    posix += (date[z] * (date[z + 3] || 0) * 1e3);
    return posix;
  };

  var __push = Array.prototype.push;

  function parse (request, pattern) {
    var parts = pattern.split(/T|\s/), date = [], match;
    if (0 < parts.length && parts.length < 3) {
      if (match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(parts[0])) {
        __push.apply(date, match.slice(1, 4));
        parts.shift();
      }
      if (parts[0]) {
        if (match = /^(\d{2}):(\d{2})(?::(\d{2})(\.(\d+))?)?(Z|(([+-])(\d{2}(:\d{2}){0,2})))?$/.exec(parts[0])) {
          __push.apply(date, match.slice(1, 4));
          __push.call(date, match[5] || 0);
          if (match[7]) {
            __push.call(date, match[8]);
            __push.apply(date, match[9].split(/:/));
          }
        } else return;
      }
      date = makeDate(request, date);
      return match[6] ? date : convertToPOSIX(request, date);
    }
  }

  function search (zone, clock, milliseconds) {
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

  function convertToWallclock (request, posix) {
    if (request.zone === "UTC") return posix;
    var index, zone;
    zone = request.zones[request.zone];
    index = search(zone, "posix", posix);
    request.entry = zone[index];
    return posix + request.entry.offset;
  };

  function convertToPOSIX (request, wallclock) {
    if (request.zone === "UTC") return wallclock;

    var zone, entry, diff;
    zone = request.zones[request.zone]
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
