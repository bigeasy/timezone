#!/usr/bin/env node
require("proof")(14, function (equal) {
  var tz = require("timezone")(require("timezone/nds_DE"));
  // nds_DE abbreviated days of week
  equal(tz("2006-01-01", "%a", "nds_DE"), "Sun", "Sun");
  equal(tz("2006-01-02", "%a", "nds_DE"), "Mon", "Mon");
  equal(tz("2006-01-03", "%a", "nds_DE"), "Tue", "Tue");
  equal(tz("2006-01-04", "%a", "nds_DE"), "Wed", "Wed");
  equal(tz("2006-01-05", "%a", "nds_DE"), "Thu", "Thu");
  equal(tz("2006-01-06", "%a", "nds_DE"), "Fri", "Fri");
  equal(tz("2006-01-07", "%a", "nds_DE"), "Sat", "Sat");

  // nds_DE days of week
  equal(tz("2006-01-01", "%A", "nds_DE"), "Sunday", "Sunday");
  equal(tz("2006-01-02", "%A", "nds_DE"), "Monday", "Monday");
  equal(tz("2006-01-03", "%A", "nds_DE"), "Tuesday", "Tuesday");
  equal(tz("2006-01-04", "%A", "nds_DE"), "Wednesday", "Wednesday");
  equal(tz("2006-01-05", "%A", "nds_DE"), "Thursday", "Thursday");
  equal(tz("2006-01-06", "%A", "nds_DE"), "Friday", "Friday");
  equal(tz("2006-01-07", "%A", "nds_DE"), "Saturday", "Saturday");
});
