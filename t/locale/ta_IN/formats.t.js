#!/usr/bin/env node
require("proof")(5, function (equal) {
  var tz = require("timezone")(require("timezone/ta_IN"));
  // ta_IN date representation
  equal(tz("2000-09-03", "%x", "ta_IN"), "09/03/00", "date format");

  // ta_IN time representation
  equal(tz("2000-09-03 08:05:04", "%X", "ta_IN"), "08:05:04", "long time format morning");
  equal(tz("2000-09-03 23:05:04", "%X", "ta_IN"), "23:05:04", "long time format evening");

  // ta_IN date time representation
  equal(tz("2000-09-03 08:05:04", "%c", "ta_IN"), "Sun Sep  3 08:05:04 2000", "long date format morning");
  equal(tz("2000-09-03 23:05:04", "%c", "ta_IN"), "Sun Sep  3 23:05:04 2000", "long date format evening");
});
