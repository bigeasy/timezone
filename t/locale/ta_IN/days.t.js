#!/usr/bin/env node
require("proof")(14, function (equal) {
  var tz = require("timezone")(require("timezone/ta_IN"));
  // ta_IN abbreviated days of week
  equal(tz("2006-01-01", "%a", "ta_IN"), "Sun", "Sun");
  equal(tz("2006-01-02", "%a", "ta_IN"), "Mon", "Mon");
  equal(tz("2006-01-03", "%a", "ta_IN"), "Tue", "Tue");
  equal(tz("2006-01-04", "%a", "ta_IN"), "Wed", "Wed");
  equal(tz("2006-01-05", "%a", "ta_IN"), "Thu", "Thu");
  equal(tz("2006-01-06", "%a", "ta_IN"), "Fri", "Fri");
  equal(tz("2006-01-07", "%a", "ta_IN"), "Sat", "Sat");

  // ta_IN days of week
  equal(tz("2006-01-01", "%A", "ta_IN"), "Sunday", "Sunday");
  equal(tz("2006-01-02", "%A", "ta_IN"), "Monday", "Monday");
  equal(tz("2006-01-03", "%A", "ta_IN"), "Tuesday", "Tuesday");
  equal(tz("2006-01-04", "%A", "ta_IN"), "Wednesday", "Wednesday");
  equal(tz("2006-01-05", "%A", "ta_IN"), "Thursday", "Thursday");
  equal(tz("2006-01-06", "%A", "ta_IN"), "Friday", "Friday");
  equal(tz("2006-01-07", "%A", "ta_IN"), "Saturday", "Saturday");
});
