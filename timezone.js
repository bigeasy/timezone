!function (definition) {
  if (typeof module == "object" && module.exports) module.exports = definition();
  else if (typeof define == "function" && typeof define.amd == "object") define(definition);
  else this.tz = definition();
} (function () {
  var __slice = [].slice, __push = [].push;
/*
  function die () {
    console.log.apply(console, __slice.call(arguments, 0));
    return process.exit(1);
  };

  function say () { return console.log.apply(console, __slice.call(arguments, 0)) }
*/
  function format (posix, rest) {
    var wallclock = new Date(convertToWallclock(this, posix)), self = this;
    return rest.replace(/%([-0_^]?)(:{0,3})(\d*)(.)/g, function (matched, flag, colons, padding, specifier) {
      var f, value = matched, fill = "0";
      if (f = self[specifier]) {
        value = String(f.call(self, wallclock, posix, flag, (colons || "").length));
        if ((flag || f.style) == "_") fill = " ";
        pad = parseInt(flag == "-" ? 0 : (f.pad || 0));
        while (value.length < pad) value = fill + value;
        pad = parseInt(flag == "-" ? 0 : (padding || f.pad));
        while (value.length < pad) value = fill + value;
        if (specifier == "N" && pad < value.length) value = value.slice(0, pad);
        if (flag == "^") value = value.toUpperCase();
      }
      return value;
    });
  };

  function makeDate (request, date) {
    var posix, z, i, I;
    if (~(z = date.indexOf('+')) || ~(z = date.indexOf('-'))) {
      date[z] += 1;
      posix = true;
    } else {
      date[z = date.length] = 1;
    }
    for (i = 0; i < 11; i++) {
      date[i] = date[i] || 0;
    }
    --date[1];
    date = Date.UTC.apply(Date.UTC, date.slice(0, z)) + -date[z] * (date[z + 1] * 36e5 + date[z + 2] * 6e4 + date[z + 3] * 1e3);
    return posix ? date : convertToPOSIX(request, date);
  }

  function parse (request, pattern) {
    var parts = pattern.split(/T|\s/), date = [], match;
    if (0 < parts.length && parts.length < 3) {
      if (match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(parts[0])) {
        __push.apply(date, match.slice(1, 4));
        parts.shift();
      } else {
        __push.apply(date, request.convert([ request.clock(), "%Y-%m-%d" ]).split(/-/));
      }
      if (parts[0]) {
        if (match = /^(\d{2}):(\d{2})(?::(\d{2})(\.(\d+))?)?(Z|(([+-])(\d{2}(:\d{2}){0,2})))?$/.exec(parts[0])) {
          __push.apply(date, match.slice(1, 4));
          __push.call(date, match[5] || 0);
          if (match[7]) {
            __push.call(date, match[8]);
            __push.apply(date, match[9].split(/:/));
          } else if (match[6]) {
            __push.call(date, "+");
          }
        } else return;
      }
      return makeDate(request, date);
    }
  }

  function actualize (entry, rule, year) {
    var actualized, fields, date = rule.day[1];

    do {
      fields = new Date(Date.UTC(year, rule.month, Math.abs(date++)));
    } while (rule.day[0] < 7 && fields.getUTCDay() != rule.day[0])

    actualized = {
      clock: rule.clock,
      sortable: fields.getTime(),
      rule: rule,
      save: rule.save * 6e4,
      offset: entry.offset
    };

    // TODO Why is `saved` 0?
    actualized[actualized.clock] = fields.getTime() + rule.time * 6e4;

    if (actualized.clock == "posix") {
      actualized.wallclock = actualized.posix + (entry.offset + rule.saved);
    } else {
      actualized.posix = actualized.wallclock - (entry.offset + rule.saved);
    }

    return actualized;
  }

  function applicable (entry, rules, actualized, time) {
    var last, i, I, j, year = new Date(time).getUTCFullYear();
    for (j = year + 1; j >= year - 1; --j) {
      for (i = 0, I = rules.length; i < I; i++) {
          if (rules[i].from <= j && j <= rules[i].to) {
            actualized.push(actualize(entry, rules[i], j));
          } else if (rules[i].to < j) {
            last = rules[i].to;
            break;
        }
      }
    }
    return last;
  }

  function find (request, clock, time) {
    var i, I, entry, year = new Date(time).getUTCFullYear(), found, zone = request[request.zone], actualized = [], to, abbrevs;
    for (i = 0, I = zone.length; i < I; i++) if (zone[i][clock] <= time) break;
    entry = zone[i];
    if (entry.rules) {
      rules = request[entry.rules];
      to = applicable(entry, rules, actualized, time);
      if (to != null) applicable(entry, rules, actualized, Date.UTC(to, 5));
      actualized.sort(function (a, b) { return a.sortable - b.sortable });
      for (i = 0, I = actualized.length; i < I; i++) {
        if (time >= actualized[i][clock] && actualized[i][actualized[i].clock] > entry[actualized[i].clock]) found = actualized[i];
      }
    }
    if (found) {
      if (abbrevs = /^(.*)\/(.*)$/.exec(entry.format)) {
        found.abbrev = abbrevs[found.save != 0 ? 2 : 1];
      } else {
        found.abbrev = entry.format.replace(/%s/, found.rule.letter);
      }
    }
    return found || entry;
  }

  function convertToWallclock (request, posix) {
    if (request.zone == "UTC") return posix;
    request.entry = find(request, "posix", posix);
    return posix + request.entry.offset + request.entry.save;
  };

  function convertToPOSIX (request, wallclock) {
    if (request.zone == "UTC") return wallclock;

    var entry, diff;
    request.entry = entry = find(request, "wallclock", wallclock);
    diff = wallclock - entry.wallclock;

    return 0 < diff && diff < entry.save ? null : wallclock - entry.offset - entry.save;
  };

  function parseAdjustment (pattern) {
    var match = UNIT_RE.exec(pattern);
    return match && function (request, posix) { return adjust(request, posix, match) }
  };

  function adjust (request, posix, match) {
    var increment = parseInt(match[1] + 1)
      , offset = parseInt(match[2], 10) * increment
      , index = UNITS.indexOf(match[3].toLowerCase())
      , date
      ;
    if (index > 9) {
      posix += offset * TIME[index - 10];
    } else {
      date = new Date(convertToWallclock(request, posix));
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
        posix = convertToPOSIX(request, date.getTime() + 864e5 * increment) - 864e5 * increment;
      }
    }
    return posix;
  };

  function convert (splat) {
    if (splat.length == 0) return this.clock();

    var i, I, adjustment, argument, date, posix, type
      , request = Object.create(this)
      , adjustments = []
      ;

    for (i = 0; splat.length; i++) {
      argument = splat.shift();
      type = typeof argument;
      if (type == "number" && i == 0) {
        request.date = argument;
      } else if (type == "string") {
        if (~argument.indexOf("%")) {
          request.format = argument;
        } else if (/^\w{2}_\w{2}$/.test(argument)) {
          request.locale = argument;
        } else if (adjustment = parseAdjustment(argument)) {
          adjustments.push(adjustment);
        } else if (request[argument]) {
          request.zone = argument;
        } else if (i == 0) {
          request.date = argument;
        }
      } else if (type == "function") {
        argument.call(request);
      } else if (Array.isArray(argument)) {
        if (i == 0 && typeof argument[0] == "number") {
          request.date = argument;
        } else {
          splat.unshift.apply(splat, argument);
        }
      } else { //if (type == "object") {
        if (/^\w{2}_\w{2}$/.test(argument.name)) {
          request[argument.name] = argument;
        } else if (argument.zones) {
          for (var key in argument.zones) request[key] = argument.zones[key];
          for (var key in argument.rules) request[key] = argument.rules[key];
        }
      }
    }

    if ((date = request.date) != null) {
      if (!request[request.locale]) throw new Error("unknown locale");

      if (typeof date == "string") {
        if ((posix = parse(request, date)) == null) {
          throw new Error("invalid date");
        }
      } /*else if (typeof date == "number") {
        posix = date;
      } */else if (Array.isArray(date)) {
        posix = makeDate(request, date);
      } else posix = +(date);

      for (i = 0, I = adjustments.length; i < I; i++) {
        posix = adjustments[i](request, posix);
      }

      return request.format ? format.call(request, posix, request.format) : posix;
    }

    return function() { return convert.call(request, __slice.call(arguments, 0)) };
  };

  var context =
    { zone: "UTC"
    , entry: { abbrev: "UTC", offset: 0, save: 0 }
    , clock: function () { return +(new Date()) }
    , convert: convert
    , d: function(date) { return date.getUTCDate() }
    , m: function(date) { return date.getUTCMonth() + 1 }
    , Y: function(date) { return date.getUTCFullYear() }
    , F: function(date, posix) { return this.convert([ posix, "%Y-%m-%d" ]) }
    , H: function(date) { return date.getUTCHours() }
    , M: function(date) { return date.getUTCMinutes() }
    , s: function(date) { return Math.floor(date.getTime() / 1000) }
    , S: function(date) { return date.getUTCSeconds() }
    , N: function(date) { return (date.getTime() % 1000) * 1000000 }
    , R: function(date, posix) { return this.convert([ posix, "%H:%M" ]) }
    , T: function(date, posix) { return this.convert([ posix, "%H:%M:%S" ]) }
    , z: function(date, posix, flag, delimiters) {
        var offset = this.entry.offset + this.entry.save
          , seconds = Math.abs(offset / 1000), parts = [], part = 3600, i, z;
        for (i = 0; i < 3; i++) {
          parts.push(("0" + Math.floor(seconds / part)).slice(-2));
          seconds %= part;
          part /= 60;
        }
        if (flag == "^" && !offset) return "Z";
        if (flag == "^") delimiters = 3;
        if (delimiters == 3) {
          z = parts.join(":");
          z = z.replace(/:00$/, "");
          if (flag != "^") z = z.replace(/:00$/, "");
        } else if (delimiters) {
          z = parts.slice(0, delimiters + 1).join(":");
          if (flag == "^") z = z.replace(/:00$/, "");
        } else {
          z = parts.slice(0, 2).join("");
        }
        z = (offset < 0 ? "-" : "+") + z;
        z = z.replace(/([-+])(0)/, { "_": " $1", "-": "$1" }[flag] || "$1$2");
        return z;
      }
    , Z: function(date) { return this.entry.abbrev }
    , "%": function(date) { return "%" }
    , n: function(date) { return "\n" }
    , t: function(date) { return "\t" }
    , a: function (date) { return this[this.locale].day.abbrev[date.getUTCDay()] }
    , A: function (date) { return this[this.locale].day.full[date.getUTCDay()] }
    , j: function (date) { return Math.floor((date.getTime() - Date.UTC(date.getUTCFullYear(), 0)) / 864e5) + 1 }
    , e: function (date) { return date.getUTCDate() }
    , u: function (date) { return date.getUTCDay() == 0 ? 7 : date.getUTCDay() }
    , w: function (date) { return date.getUTCDay() }
    , U: function (date) { return weekOfYear(date, 0) }
    , W: function (date) { return weekOfYear(date, 1) }
    , V: function (date) { return isoWeek(date)[0] }
    , G: function (date) { return isoWeek(date)[1] }
    , g: function (date) { return isoWeek(date)[1] % 100 }
    , h: function (date) { return this[this.locale].month.abbrev[date.getUTCMonth()] }
    , b: function (date) { return this[this.locale].month.abbrev[date.getUTCMonth()] }
    , B: function (date) { return this[this.locale].month.full[date.getUTCMonth()] }
    , y: function (date) { return date.getUTCFullYear() % 100 }
    , C: function (date) { return Math.floor(date.getUTCFullYear() / 100) }
    , D: function (date, posix) { return this.convert([ posix, "%m/%d/%y" ]) }
    , x: function (date, posix) { return this.convert([ posix, this[this.locale].date ]) }
    , l: function (date) { return date.getUTCHours() % 12 == 0 ? 12 : date.getUTCHours() % 12 }
    , I: function (date) { return date.getUTCHours() % 12 == 0 ? 12 : date.getUTCHours() % 12 }
    , k: function (date) { return date.getUTCHours() }
    , P: function (date) { return this[this.locale].meridiem[Math.floor(date.getUTCHours() / 12)].toLowerCase() }
    , p: function (date) { return this[this.locale].meridiem[Math.floor(date.getUTCHours() / 12)] }
    , r: function (date, posix) { return this.convert([ posix, this[this.locale].time12 ]) }
    , X: function (date, posix) { return this.convert([ posix, this[this.locale].time24 ]) }
    , c: function (date, posix) { return this.convert([ posix, this[this.locale].dateTime ]) }
    , locale: "en_US"
    , en_US: {
        day: {
          abbrev: "Sun|Mon|Tue|Wed|Thu|Fri|Sat".split("|"),
          full: "Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday".split("|")
        },
        month: {
          abbrev: "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec".split("|"),
          full: "January|February|March|April|May|June|July|August|September|October|November|December".split("|")
        },
        date: "%m/%d/%Y",
        time24: "%I:%M:%S %p",
        time12: "%I:%M:%S %p",
        dateTime: "%a %d %b %Y %I:%M:%S %p %Z",
        meridiem: [ "AM", "PM" ]
      }
    };
  var UNITS = "Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|year|month|day|hour|minute|second|milli|millisecond"
    , UNIT_RE = new RegExp("^\\s*([+-])(\\d+)\\s+(" + UNITS + ")s?\\s*$", "i")
    , TIME = [ 36e5, 6e4, 1e3, 1, 1 ]
    ;
  UNITS = UNITS.toLowerCase().split("|");

  "dmHMSUWVgCIky".replace(/./g, function (e) { context[e].pad = 2 });
  //"kle".replace(/./g, function (e) { context[e].style = "_" });
  // 2945
  /*
  context.d.pad = 2;
  context.m.pad = 2;
  context.H.pad = 2;
  context.M.pad = 2;
  context.S.pad = 2;
  context.U.pad = 2;
  context.W.pad = 2;
  context.V.pad = 2;
  context.g.pad = 2;
  context.C.pad = 2;
  context.I.pad = 2;
  context.k.pad = 2;
  context.y.pad = 2;
*/
  context.N.pad = 9;
  context.j.pad = 3;

  context.k.style = "_";
  context.l.style = "_";
  context.e.style = "_";


  function weekOfYear (date, startOfWeek) {
    var diff, nyd, weekStart;
    nyd = new Date(Date.UTC(date.getUTCFullYear(), 0));
    diff = Math.floor((date.getTime() - nyd.getTime()) / 864e5);
    if (nyd.getUTCDay() == startOfWeek) {
      weekStart = 0;
    } else {
      weekStart = 7 - nyd.getUTCDay() + startOfWeek;
      if (weekStart == 8) {
        weekStart = 1;
      }
    }
    return diff >= weekStart ? Math.floor((diff - weekStart) / 7) + 1 : 0;
  }

  function isoWeek (date) {
    var nyd, nyy, week;
    nyy = date.getUTCFullYear();
    nyd = new Date(Date.UTC(nyy, 0)).getUTCDay();
    week = weekOfYear(date, 1) + (nyd > 1 && nyd <= 4 ? 1 : 0);
    if (week == 0) {
      nyy = date.getUTCFullYear() - 1;
      nyd = new Date(Date.UTC(nyy, 0)).getUTCDay();
      week = nyd == 4 || (nyd == 3 && new Date(nyy, 1, 29).getDate() == 29) ? 53 : 52;
      return [week, date.getUTCFullYear() - 1];
    } else if (week == 53 && !(nyd == 4 || (nyd == 3 && new Date(nyy, 1, 29).getDate() == 29))) {
      return [1, date.getUTCFullYear() + 1];
    } else {
      return [week, date.getUTCFullYear()];
    }
  }

  return function () { return convert.call(context, __slice.call(arguments, 0)) }
});
