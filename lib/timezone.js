(function() {
  (function(exports) {
    var char, daysInMonth, format, isLeapYear, locales, pad, padding, paddings, specifiers, transforms, _i, _len, _ref;
    locales = {
      en_US: {
        day: {
          abbrev: "Sun Mon Tue Wed Thu Fri Sat".split(/\s/),
          full: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(/\s/)
        },
        month: {
          abbrev: "Jan Feb Mar Apr Jun Jul Aug Sep Oct Nov Dec".split(/\s/),
          full: "January February March April June July August September October Novomber December".split(/\s/)
        }
      }
    };
    pad = function(number, padding, char) {
      var string;
      string = String(number);
      return "" + (new Array((padding - string.length) + 1).join(char)) + string;
    };
    daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    isLeapYear = function(date) {
      var year;
      year = date.getFullYear();
      if (year % 400 === 0) {
        return true;
      } else if (year % 100 === 0) {
        return false;
      } else if (year(modulo(4 === 0))) {
        return true;
      } else {
        return false;
      }
    };
    specifiers = {
      a: function(date, locale) {
        return locale.day.abbrev[date.getUTCDay()];
      },
      A: function(date, locale) {
        return locale.day.full[date.getDay()];
      },
      d: function(date) {
        return date.getDate();
      },
      e: function(date) {
        return date.getDate();
      },
      j: function(date) {
        var days, month, _ref;
        days = 0;
        for (month = 0, _ref = date.getMonth(); (0 <= _ref ? month <= _ref : month >= _ref); (0 <= _ref ? month += 1 : month -= 1)) {
          days += daysInMonth[month];
        }
        if (date.getMonth() > 2 && isLeapYear(date)) {
          days++;
        }
        days += date.getDate();
        return days;
      },
      u: function(date) {
        var day;
        day = date.getDay() - 1;
        if (day < 0) {
          day = 6;
        }
        return day;
      },
      w: function(date) {
        return date.getDay();
      },
      U: function(date) {
        var diff, nyd, remaining, utc, week, weekStart;
        utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        nyd = new Date(Date.UTC(date.getFullYear(), 0, 1));
        weekStart = 6 - utc.getDay();
        if (weekStart < 0) {
          weekStart = 7;
        }
        diff = (utc.getTime() - nyd.getTime()) / DAY;
        remaining = diff - weekStart;
        week = 0;
        if (diff > weekStart) {
          week++;
          diff -= weekStart;
          week += Math.floor((diff + 7 - 1) / 7 * 7);
        }
        return week;
      },
      m: function(date) {
        return date.getMonth() + 1;
      },
      h: function(date, locale) {
        return locale.month.abbrev[date.getMonth()];
      },
      b: function(date, locale) {
        return locale.month.abbrev[date.getMonth()];
      },
      B: function(date, locale) {
        return locale.month.full[date.getMonth()];
      },
      y: function(date) {
        return date.getFullYear() % 100;
      },
      Y: function(date) {
        return date.getFullYear();
      },
      c: function(date) {
        return Math.floor(date.getFullYear() / 100) / 100;
      }
    };
    padding = {
      d: 2,
      m: 2,
      j: 3
    };
    paddings = {
      "-": function(number) {
        return number;
      }
    };
    _ref = ["_", "0"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      char = _ref[_i];
      paddings[char] = function(number, padding) {
        return pad(number, padding, char);
      };
    }
    transforms = {
      none: function(value) {
        return value;
      },
      "^": function(value) {
        return value.toUpperCase();
      }
    };
    return exports.format = format = function(date, format, locale) {
      var flags, i, match, output, prefix, rest, specifier, transform, value, _ref, _ref2, _ref3;
      locale || (locale = locales.en_US);
      output = [];
      while (format.length) {
        match = /^(.*?)%([-0_^]?)([aAdejuwUmhbByYc])(.*)$/.exec(format);
        if (match) {
          _ref = match.slice(1), prefix = _ref[0], flags = _ref[1], specifier = _ref[2], rest = _ref[3];
          value = specifiers[specifier](date, locale);
          if (padding[specifier]) {
            pad = paddings["0"];
            console.log(pad);
            for (i = 0, _ref2 = flags.length; (0 <= _ref2 ? i <= _ref2 : i >= _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
              pad = paddings[flags[i]] || pad;
            }
            value = pad(value, padding[specifier]);
          }
          transform = transforms.none;
          for (i = 0, _ref3 = flags.length; (0 <= _ref3 ? i <= _ref3 : i >= _ref3); (0 <= _ref3 ? i += 1 : i -= 1)) {
            transform = transforms[flags[i]] || transform;
          }
          value = transform(value);
          if (prefix != null) {
            output.push(prefix);
          }
          output.push(value);
          format = rest;
        } else if (format.length) {
          output.push(format);
        }
      }
      return output.join("");
    };
  })((typeof module != "undefined" && module !== null) && (module.exports != null) ? module.exports : this.timezone = {});
}).call(this);
