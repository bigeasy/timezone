#!/usr/bin/env node
require("proof")(14, function (equal) {
  var tz = require("timezone")(require("timezone/sr_RS"));
  // sr_RS abbreviated days of week
  equal(tz("2006-01-01", "%a", "sr_RS"), "Sun", "Sun");
  equal(tz("2006-01-02", "%a", "sr_RS"), "Mon", "Mon");
  equal(tz("2006-01-03", "%a", "sr_RS"), "Tue", "Tue");
  equal(tz("2006-01-04", "%a", "sr_RS"), "Wed", "Wed");
  equal(tz("2006-01-05", "%a", "sr_RS"), "Thu", "Thu");
  equal(tz("2006-01-06", "%a", "sr_RS"), "Fri", "Fri");
  equal(tz("2006-01-07", "%a", "sr_RS"), "Sat", "Sat");

  // sr_RS days of week
  equal(tz("2006-01-01", "%A", "sr_RS"), "Sunday", "Sunday");
  equal(tz("2006-01-02", "%A", "sr_RS"), "Monday", "Monday");
  equal(tz("2006-01-03", "%A", "sr_RS"), "Tuesday", "Tuesday");
  equal(tz("2006-01-04", "%A", "sr_RS"), "Wednesday", "Wednesday");
  equal(tz("2006-01-05", "%A", "sr_RS"), "Thursday", "Thursday");
  equal(tz("2006-01-06", "%A", "sr_RS"), "Friday", "Friday");
  equal(tz("2006-01-07", "%A", "sr_RS"), "Saturday", "Saturday");
});
