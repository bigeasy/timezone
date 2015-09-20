#!/usr/bin/env node
require("proof")(5, function (equal) {
  var tz = require("timezone")(require("timezone/en_HK"));
  // en_HK date representation
  equal(tz("2000-09-03", "%x", "en_HK"), "Sunday, September 03, 2000", "date format");

  // en_HK time representation
  equal(tz("2000-09-03 08:05:04", "%X", "en_HK"), "08:05:04 UTC", "long time format morning");
  equal(tz("2000-09-03 23:05:04", "%X", "en_HK"), "11:05:04 UTC", "long time format evening");

  // en_HK date time representation
  equal(tz("2000-09-03 08:05:04", "%c", "en_HK"), "Sunday, September 03, 2000 AM08:05:04 UTC", "long date format morning");
  equal(tz("2000-09-03 23:05:04", "%c", "en_HK"), "Sunday, September 03, 2000 PM11:05:04 UTC", "long date format evening");
});
