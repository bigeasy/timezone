#!/usr/bin/env node
require("proof")(14, function (equal) {
  var tz = require("timezone")(require("timezone/hi_IN"));
  // hi_IN abbreviated days of week
  equal(tz("2006-01-01", "%a", "hi_IN"), "Sun", "Sun");
  equal(tz("2006-01-02", "%a", "hi_IN"), "Mon", "Mon");
  equal(tz("2006-01-03", "%a", "hi_IN"), "Tue", "Tue");
  equal(tz("2006-01-04", "%a", "hi_IN"), "Wed", "Wed");
  equal(tz("2006-01-05", "%a", "hi_IN"), "Thu", "Thu");
  equal(tz("2006-01-06", "%a", "hi_IN"), "Fri", "Fri");
  equal(tz("2006-01-07", "%a", "hi_IN"), "Sat", "Sat");

  // hi_IN days of week
  equal(tz("2006-01-01", "%A", "hi_IN"), "Sunday", "Sunday");
  equal(tz("2006-01-02", "%A", "hi_IN"), "Monday", "Monday");
  equal(tz("2006-01-03", "%A", "hi_IN"), "Tuesday", "Tuesday");
  equal(tz("2006-01-04", "%A", "hi_IN"), "Wednesday", "Wednesday");
  equal(tz("2006-01-05", "%A", "hi_IN"), "Thursday", "Thursday");
  equal(tz("2006-01-06", "%A", "hi_IN"), "Friday", "Friday");
  equal(tz("2006-01-07", "%A", "hi_IN"), "Saturday", "Saturday");
});
