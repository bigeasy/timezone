#!/usr/bin/env node
require("proof")(5, function (equal) {
  var tz = require("timezone")(require("timezone/nds_DE"));
  // nds_DE date representation
  equal(tz("2000-09-03", "%x", "nds_DE"), "09/03/00", "date format");

  // nds_DE time representation
  equal(tz("2000-09-03 08:05:04", "%X", "nds_DE"), "08:05:04", "long time format morning");
  equal(tz("2000-09-03 23:05:04", "%X", "nds_DE"), "23:05:04", "long time format evening");

  // nds_DE date time representation
  equal(tz("2000-09-03 08:05:04", "%c", "nds_DE"), "Sun Sep  3 08:05:04 2000", "long date format morning");
  equal(tz("2000-09-03 23:05:04", "%c", "nds_DE"), "Sun Sep  3 23:05:04 2000", "long date format evening");
});
