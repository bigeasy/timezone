#!/usr/bin/env node
require("proof")(5, function (equal) {
  var tz = require("timezone")(require("timezone/hi_IN"));
  // hi_IN date representation
  equal(tz("2000-09-03", "%x", "hi_IN"), "09/03/00", "date format");

  // hi_IN time representation
  equal(tz("2000-09-03 08:05:04", "%X", "hi_IN"), "08:05:04", "long time format morning");
  equal(tz("2000-09-03 23:05:04", "%X", "hi_IN"), "23:05:04", "long time format evening");

  // hi_IN date time representation
  equal(tz("2000-09-03 08:05:04", "%c", "hi_IN"), "Sun Sep  3 08:05:04 2000", "long date format morning");
  equal(tz("2000-09-03 23:05:04", "%c", "hi_IN"), "Sun Sep  3 23:05:04 2000", "long date format evening");
});
