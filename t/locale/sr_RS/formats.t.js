#!/usr/bin/env node
require("proof")(5, function (equal) {
  var tz = require("timezone")(require("timezone/sr_RS"));
  // sr_RS date representation
  equal(tz("2000-09-03", "%x", "sr_RS"), "09/03/00", "date format");

  // sr_RS time representation
  equal(tz("2000-09-03 08:05:04", "%X", "sr_RS"), "08:05:04", "long time format morning");
  equal(tz("2000-09-03 23:05:04", "%X", "sr_RS"), "23:05:04", "long time format evening");

  // sr_RS date time representation
  equal(tz("2000-09-03 08:05:04", "%c", "sr_RS"), "Sun Sep  3 08:05:04 2000", "long date format morning");
  equal(tz("2000-09-03 23:05:04", "%c", "sr_RS"), "Sun Sep  3 23:05:04 2000", "long date format evening");
});
