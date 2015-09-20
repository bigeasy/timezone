#!/usr/bin/env node
require("proof")(14, function (equal) {
  var tz = require("timezone")(require("timezone/en_HK"));
  // en_HK abbreviated days of week
  equal(tz("2006-01-01", "%a", "en_HK"), "Sun", "Sun");
  equal(tz("2006-01-02", "%a", "en_HK"), "Mon", "Mon");
  equal(tz("2006-01-03", "%a", "en_HK"), "Tue", "Tue");
  equal(tz("2006-01-04", "%a", "en_HK"), "Wed", "Wed");
  equal(tz("2006-01-05", "%a", "en_HK"), "Thu", "Thu");
  equal(tz("2006-01-06", "%a", "en_HK"), "Fri", "Fri");
  equal(tz("2006-01-07", "%a", "en_HK"), "Sat", "Sat");

  // en_HK days of week
  equal(tz("2006-01-01", "%A", "en_HK"), "Sunday", "Sunday");
  equal(tz("2006-01-02", "%A", "en_HK"), "Monday", "Monday");
  equal(tz("2006-01-03", "%A", "en_HK"), "Tuesday", "Tuesday");
  equal(tz("2006-01-04", "%A", "en_HK"), "Wednesday", "Wednesday");
  equal(tz("2006-01-05", "%A", "en_HK"), "Thursday", "Thursday");
  equal(tz("2006-01-06", "%A", "en_HK"), "Friday", "Friday");
  equal(tz("2006-01-07", "%A", "en_HK"), "Saturday", "Saturday");
});
