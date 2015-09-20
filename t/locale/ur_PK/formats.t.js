#!/usr/bin/env node
require("proof")(5, function (equal) {
  var tz = require("timezone")(require("timezone/ur_PK"));
  // ur_PK date representation
  equal(tz("2000-09-03", "%x", "ur_PK"), "09/03/00", "date format");

  // ur_PK time representation
  equal(tz("2000-09-03 08:05:04", "%X", "ur_PK"), "08:05:04", "long time format morning");
  equal(tz("2000-09-03 23:05:04", "%X", "ur_PK"), "23:05:04", "long time format evening");

  // ur_PK date time representation
  equal(tz("2000-09-03 08:05:04", "%c", "ur_PK"), "Sun Sep  3 08:05:04 2000", "long date format morning");
  equal(tz("2000-09-03 23:05:04", "%c", "ur_PK"), "Sun Sep  3 23:05:04 2000", "long date format evening");
});
