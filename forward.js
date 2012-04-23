function die () {
  if (arguments.length) console.log.apply(console, Array.prototype.slice.call(arguments, 0));
  process.exit(1);
}

function say() {
  if (arguments.length) console.log.apply(console, Array.prototype.slice.call(arguments, 0));
}

var _data = (function () {
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

var transitions = require("./transitions");

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
  function decodeAbbreviations (encoded) {
    var abbrevs = [];
    var groups = encoded.split("/"), length;
    for (var j = 0, J = groups.length; j < J; j++) {
      length = j + 3;
      for (var i = 0, I = groups[j].length / length; i < I; i++) {
        abbrevs.push(groups[j].substring(i * length, i * length + length));
      }
    }
    return abbrevs;
  }
  function encodeAbbeviations (table) {
    var abbrevs = {}, index = 0, grouped = [], groups = [];
    for (var i = 1, length = table.length; i < length; i++) abbrevs[table[i].abbrev] = true;
    for (var abbrev in abbrevs) {
      if (abbrev.length < 3) die(abbrev);
      if (!grouped[abbrev.length]) grouped[abbrev.length] = []
      grouped[abbrev.length].push(abbrev);
    }
    for (var i = 3; i < grouped.length; i++) {
      groups.push((grouped[i] || []).join(""));
    }
    return groups.join("/");
  }
  const ESC = { 92: '\\\\', 34: '\\"', 13: "\\r", 10: "\\n" };
  function character(v, i, s) {
    var code = (Math.floor(Math.abs(v) / Math.pow(128, i)) % 128) + (s ? 128 : 0);
    return ESC[code] || String.fromCharCode(code);
  }

  // Essentially little endian, not two's compliment.
  function enc (v, size) {
    var e = [];
    for (var i = 0; i < size; i++) e[i] = character(v, i, i == size - 1 && v < 0);
    return e.join("");
  }
  function dec (enc) {
    var i = enc.length - 1, sign = (enc.charCodeAt(i) & 128 ? -1 : 1), value;
    value = Math.pow(128, i) * (enc.charCodeAt(i) & ~128);
    for (i--; i >= 0; i--) value += Math.pow(128, i) * enc.charCodeAt(i);
    return sign * value;
  }
  function encode (table) {
    var zone = [ encodeAbbeviations(table) ];
    var abbrevs = decodeAbbreviations(zone[0]);
    var encoded = [];
    var maxOff = 0;
    var count = 0;
    var g = 0;
    for (var i = 1, I = table.length; i < I - 1; i++) {
      if (table[i].save / 1000 / 60 > 120) die("x" + (table[i].save / 1000 / 60));
      encoded.push(enc(table[i].posix / 1000, 5));
      var offset = (table[i].posix / 1000) - (table[i].wallclock / 1000);
      encoded.push(enc(offset, 3));
      // TODO No more or zero.
      encoded.push(enc((table[i].save || 0)/ 1000 / 60, 1));
      encoded.push(enc(abbrevs.indexOf(table[i].abbrev), 1));
      if (eval('"' + encoded.join("") + '"').length != i * 10) die (table[i]);
      count++;
    }
    encoded.push(enc(abbrevs.indexOf(table[table.length - 1].abbrev), 1));
    return zone[0] + '|' + encoded.join("");
  }
  function zoneinfo (table) {
    table.splice(0, 2);
    var abbrevs = [], index;
    if (table.length == 0) return table;
    while (typeof table[0] != "number") abbrevs.push(table.shift());
    for (var i = 0, I = Math.floor(table.length / 4); i < I; i++) {
      var j = i * 4;
      table[j + 1] = Math.round((table[j] - table[j + 1]) * 1000 * 100);
      table[j] = Math.round(table[j] * 1000 * 100);
      table[j + 2] = Math.round(table[j + 2] * 1000 * 60 * 10);
      table[j + 3] = abbrevs[table[j + 3]];
    }
    table.push(Number.MIN_VALUE, Number.MIN_VALUE, 0, abbrevs[table.pop()]);
    return table;
  }
  function decode (encoded) {
    var pipe = encoded.indexOf('|')
      , abbrevs = decodeAbbreviations(encoded.slice(0, pipe))
      , table = encoded.slice(pipe + 1)
      , decoded = []
      , offset, posix;
    for (var i = 0, I = Math.floor(table.length / 10); i < I; i++) {
      offset = i * 10;
      decoded.push((posix = dec(table.slice(offset, offset + 5))) * 1000);
      decoded.push((posix - dec(table.slice(offset + 5, offset + 8))) * 1000);
      decoded.push(dec(table.slice(offset + 8, offset + 9)) * 60 * 1000);
      decoded.push(abbrevs[dec(table.slice(offset + 9, offset + 10))]);
    }
    return decoded;
  }
  var set = process.argv[2] ? [ process.argv[2] ] : Object.keys(_data.zones).filter(function (e) { return ! /^Etc/.test(e) });
  for (var i = 0, length = set.length; i < length; i++) {
    try {
      var table = transitions(_data, set[i]);
      for (var j = 1, stop = table.length - 1; j < stop; j++) {
        entry = table[j];
        say("%s %s %s %s", set[i], iso8601(entry.wallclock), iso8601(entry.posix), format(table[j + 1]), format(table[j]));
      }
      var abbrevs = {};
      for (var j = 1, J = table.length; j < J; j++) {
        abbrevs[table[j].abbrev] = true;
      }
      var encoded = [ "", table[1].wallclock - table[1].posix ];
      for (var abbrev in abbrevs) {
        encoded.push(abbrev);
      }
      for (var j = 1, J = table.length - 1; j < J; j++) {
        encoded.push(table[j].posix / 1000 / 100);
        encoded.push(((table[j].posix / 1000) - (table[j].wallclock / 1000)) / 100);
        encoded.push(table[j].save / 1000 / 60 / 10);
        encoded.push(encoded.indexOf(table[j].abbrev) - 2);
      }
      encoded.push(encoded.indexOf(table[table.length - 1].abbrev) -2);
      encoded[0] = set[i];
      var fs = require("fs");
      var parts = [ "zones" ].concat(set[i].split(/\//)), path;
      for (var j = 0, stop = parts.length - 1; j < stop; j++) {
        path = parts.slice(0, j + 1).join("/");
        try {
          fs.statSync(path);
        } catch (e) {
          if (e.code != "ENOENT") throw e;
          fs.mkdirSync(path, 0755);
        }
      }
      fs.writeFileSync(parts.join("/") + ".js", 'exports.z=' + JSON.stringify(encoded), "utf8");
      var decoded = zoneinfo(require("./" + parts.join("/")).z);
      var ok = require("assert").ok;
      var equal = require("assert").equal;
      for (var j = 1, J = table.length; j < J; j++) {
        var k = j - 1;
        equal(table[j].posix,  decoded[k * 4]);
        equal(table[j].wallclock, decoded[k * 4 + 1]);
        equal((table[j].save || 0), decoded[k * 4 + 2]);
        equal(table[j].abbrev, decoded[k * 4 + 3]);
      }
      var encoded = encode(table);
      fs.writeFileSync(parts.join("/") + ".enc.js", 'exports.z="' + encoded + '"', "utf8");
      var decoded = decode(require("./" + parts.join("/") + ".enc.js").z);
      for (var j = 1, J = table.length - 1; j < J; j++) {
        var k = j - 1;
        ok(table[j].posix == decoded[k * 4]);
        ok(table[j].wallclock == decoded[k * 4 + 1]);
        ok((table[j].save || 0) == decoded[k * 4 + 2]);
        ok(table[j].abbrev == decoded[k * 4 + 3]);
      }
    } catch (e) {
      say("Failed on " + set[i] + ".");
      throw e;
    }
  }
})();
