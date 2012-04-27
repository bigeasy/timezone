new function() {
  var __slice = [].slice, __push = [].push;
/*
  function die () {
    console.log.apply(console, __slice.call(arguments, 0));
    return process.exit(1);
  };

  function say () { return console.log.apply(console, __slice.call(arguments, 0)) }
*/
  var fills = { "_": "       ", "0": "00000000" };

  function compile (context) {
    var letters = [], key;
    for (key in context) if (key.length == 1) letters.push(key); 
    return new RegExp("^(.*?)%(?:%|(?:([-0_^]?)|(\:{0,3}))([" + letters.join("") + "]))(.*)$");
  }

  function format (posix, rest) {
    var wallclock = new Date(convertToWallclock(this, posix)), value, output = [], f, style, transform, match;
    while (rest.length) {
      if (match = this.formatter.exec(rest)) {
        if (match[4]) {
          f = this[match[4]];
          value = f.call(this, wallclock, posix, match[3]);
          if (f.pad && match[2] != "-") {
            fill = fills[f.style || match[2]] || fills["0"];
            value = (fill + value).slice(-f.pad)
          }
          if (match[2] == "^") {
            value = value.toUpperCase();
          }
          if (match[1]) {
            output.push(match[1]);
          }
          output.push(value);
        } else {
          output.push("%");
        }
        rest = match[5];
      } else {
        output.push(rest);
        rest = "";
      }
    }
    return output.join("");
  };

  function makeDate (request, date) {
    var z, i, I;
    if (~(z = date.indexOf('+')) || ~(z = date.indexOf('-'))) {
      date[z] += 1;
      // TODO Fixme.
      if (z < 5) date = recurse(request, recurse(request), "%Y-%m-%d").split(/-/).concat(date);
    } else {
      date[z = date.length] = "+1"; 
    }
    for (i = 0, I = date.length; i < I; i++) {
      date[i] = parseInt(date[i] || 0, 10);
    }
    --date[1];
    return Date.UTC.apply(Date.UTC, date.slice(0, z)) + date[z] * (date[z + 1] || 0) * 36e5 + (date[z + 2] || 0) * 6e4 + (date[z + 3] || 0) * 1e3;
  };

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
    if (request.zone == "UTC") return posix;
    var index, zone;
    zone = request[request.zone];
    index = search(zone, "posix", posix);
    request.entry = zone[index];
    return posix + request.entry.offset;
  };

  function convertToPOSIX (request, wallclock) {
    if (request.zone == "UTC") return wallclock;

    var zone, entry, diff;
    zone = request[request.zone]
    request.entry = entry = zone[search(zone, "wallclock", wallclock)];
    diff = wallclock - entry.wallclock;

    return 0 < diff && diff < entry.save ? null : wallclock - entry.offset;
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

  function zoneinfo (zones, table) {
    var j, i, I, name = table.shift(), offset = table.shift(), abbrevs = [], zone = [];
    while (typeof table[0] != "number") abbrevs.push(table.shift());
    for (i = 0, I = Math.floor(table.length / 4); i < I; i++) {
      j = i * 4;
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
    zones[name] = zone.reverse();
  }

  convert = function (splat) {
    if (splat.length == 0) return this.clock();

    var i, I, adjustment, argument, date, posix, type
      , request = Object.create(this)
      , adjustments = []
      , index = 0
      ;

    while (splat.length) {
      argument = splat.shift();
      type = typeof argument;
      if (type == "number" && index == 0) {
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
        } else if (index == 0) {
          request.date = argument;
        }
      } else if (type == "function") {
        argument.call(request);
        request.formatter = compile(request);
      } else if (Array.isArray(argument)) {
        if (index == 0 && typeof argument[0] == "number") {
          request.date = argument;
        } else {
          splat.apply.unshift(splat, argument);
        }
      } else if (type == "object") {
        if (/^\w{2}_\w{2}$/.test(argument.name)) {
          request[argument.name] = argument;
        } else if (argument.z) {
          zoneinfo(request, argument.z);
        }
      }
      index++;
    }

    if ((date = request.date) != null) {
      if (request.locale && !request[request.locale]) throw new Error("unknown locale");

      if (typeof date == "string") {
        if ((posix = parse(request, date)) == null) {
          throw new Error("invalid date");
        }
      } else if (typeof date == "number") {
        posix = date;
      } else if (Array.isArray(date)) {
        posix = makeDate(request, date);
      }

      for (i = 0, I = adjustments.length; i < I; i++) {
        posix = adjustments[i](request, posix);
      }

      return request.format ?  format.call(request, posix, request.format) : posix;
    }

    return function() { return convert.call(request, __slice.call(arguments, 0)) };
  };

  var context =
    { zone: "UTC"
    , entry: { abbrev: "UTC" }
    , clock: function () { return (+new Date()) }
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
    , z: function(date, posix, delimiters) {
        var offset = Math.abs(this.entry.offset / 1000), parts = [ 60, 60, 60 ], part, i, z;
        for (i = parts.length - 1; i > -1; i--) {
          part = parts[i];
          parts[i] = (fills[0] + (offset % part)).slice(-2);
          offset -= offset % part;
          offset /= part;
        }
        if (delimiters) {
          if (delimiters.length == 3) {
            z = parts.join(":").replace(/:00$/, "").replace(/:00$/, "");
          } else {
            z = parts.slice(0, delimiters.length + 1).join(":");
          }
        } else {
          z = parts.slice(0, 2).join("");
        }
        return this.entry.offset < 0 ? "-" + z : z;
      }
    , Z: function(date) { return this.entry.abbrev }
    };

  context.formatter = compile(context);

  context.d.pad = 2;
  context.m.pad = 2;
  context.H.pad = 2;
  context.M.pad = 2;
  context.S.pad = 2;
  context.N.pad = 9;

  function tz () { return convert.call(context, __slice.call(arguments, 0)) }

  if (typeof module == "object") module.exports = tz;
  else window.tz = tz;
}
