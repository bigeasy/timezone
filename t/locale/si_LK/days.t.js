#!/usr/bin/env node
require("proof")(14, function (equal) {
  var tz = require("timezone")(require("timezone/si_LK"));
  // si_LK abbreviated days of week
  equal(tz("2006-01-01", "%a", "si_LK"), "Sun", "Sun");
  equal(tz("2006-01-02", "%a", "si_LK"), "Mon", "Mon");
  equal(tz("2006-01-03", "%a", "si_LK"), "Tue", "Tue");
  equal(tz("2006-01-04", "%a", "si_LK"), "Wed", "Wed");
  equal(tz("2006-01-05", "%a", "si_LK"), "Thu", "Thu");
  equal(tz("2006-01-06", "%a", "si_LK"), "Fri", "Fri");
  equal(tz("2006-01-07", "%a", "si_LK"), "Sat", "Sat");

  // si_LK days of week
  equal(tz("2006-01-01", "%A", "si_LK"), "Sunday", "Sunday");
  equal(tz("2006-01-02", "%A", "si_LK"), "Monday", "Monday");
  equal(tz("2006-01-03", "%A", "si_LK"), "Tuesday", "Tuesday");
  equal(tz("2006-01-04", "%A", "si_LK"), "Wednesday", "Wednesday");
  equal(tz("2006-01-05", "%A", "si_LK"), "Thursday", "Thursday");
  equal(tz("2006-01-06", "%A", "si_LK"), "Friday", "Friday");
  equal(tz("2006-01-07", "%A", "si_LK"), "Saturday", "Saturday");
});
