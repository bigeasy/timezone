#!/usr/bin/env node
require("proof")(14, function (equal) {
  var tz = require("timezone")(require("timezone/ur_PK"));
  // ur_PK abbreviated days of week
  equal(tz("2006-01-01", "%a", "ur_PK"), "Sun", "Sun");
  equal(tz("2006-01-02", "%a", "ur_PK"), "Mon", "Mon");
  equal(tz("2006-01-03", "%a", "ur_PK"), "Tue", "Tue");
  equal(tz("2006-01-04", "%a", "ur_PK"), "Wed", "Wed");
  equal(tz("2006-01-05", "%a", "ur_PK"), "Thu", "Thu");
  equal(tz("2006-01-06", "%a", "ur_PK"), "Fri", "Fri");
  equal(tz("2006-01-07", "%a", "ur_PK"), "Sat", "Sat");

  // ur_PK days of week
  equal(tz("2006-01-01", "%A", "ur_PK"), "Sunday", "Sunday");
  equal(tz("2006-01-02", "%A", "ur_PK"), "Monday", "Monday");
  equal(tz("2006-01-03", "%A", "ur_PK"), "Tuesday", "Tuesday");
  equal(tz("2006-01-04", "%A", "ur_PK"), "Wednesday", "Wednesday");
  equal(tz("2006-01-05", "%A", "ur_PK"), "Thursday", "Thursday");
  equal(tz("2006-01-06", "%A", "ur_PK"), "Friday", "Friday");
  equal(tz("2006-01-07", "%A", "ur_PK"), "Saturday", "Saturday");
});
