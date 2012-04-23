function say() {
  if (arguments.length) console.log.apply(console, Array.prototype.slice.call(arguments, 0));
}

var _data = require("./timezones/index");

var transitions = require("./transitions");

(function () {
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
      var encoded = encode(table);
      fs.writeFileSync(parts.join("/") + ".enc.js", 'exports.z="' + encoded + '"', "utf8");
      var decoded = decode(require("./" + parts.join("/") + ".enc.js").z);
      var equal = require("assert").equal;
      for (var j = 1, J = table.length - 1; j < J; j++) {
        var k = j - 1;
        equal(table[j].posix, decoded[k * 4]);
        equal(table[j].wallclock, decoded[k * 4 + 1]);
        equal((table[j].save || 0), decoded[k * 4 + 2]);
        equal(table[j].abbrev, decoded[k * 4 + 3]);
      }
    } catch (e) {
      say("Failed on " + set[i] + ".");
      throw e;
    }
  }
})();
