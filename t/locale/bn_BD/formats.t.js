#!/usr/bin/env node
require("proof")(5, function (equal) {
  var tz = require("timezone")(require("timezone/bn_BD"));
  // bn_BD date representation
  equal(tz("2000-09-03", "%x", "bn_BD"), "09/03/00", "date format");

  // bn_BD time representation
  equal(tz("2000-09-03 08:05:04", "%X", "bn_BD"), "08:05:04", "long time format morning");
  equal(tz("2000-09-03 23:05:04", "%X", "bn_BD"), "23:05:04", "long time format evening");

  // bn_BD date time representation
  equal(tz("2000-09-03 08:05:04", "%c", "bn_BD"), "Sun Sep  3 08:05:04 2000", "long date format morning");
  equal(tz("2000-09-03 23:05:04", "%c", "bn_BD"), "Sun Sep  3 23:05:04 2000", "long date format evening");
});
