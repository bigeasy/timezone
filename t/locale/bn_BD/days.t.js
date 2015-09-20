#!/usr/bin/env node
require("proof")(14, function (equal) {
  var tz = require("timezone")(require("timezone/bn_BD"));
  // bn_BD abbreviated days of week
  equal(tz("2006-01-01", "%a", "bn_BD"), "Sun", "Sun");
  equal(tz("2006-01-02", "%a", "bn_BD"), "Mon", "Mon");
  equal(tz("2006-01-03", "%a", "bn_BD"), "Tue", "Tue");
  equal(tz("2006-01-04", "%a", "bn_BD"), "Wed", "Wed");
  equal(tz("2006-01-05", "%a", "bn_BD"), "Thu", "Thu");
  equal(tz("2006-01-06", "%a", "bn_BD"), "Fri", "Fri");
  equal(tz("2006-01-07", "%a", "bn_BD"), "Sat", "Sat");

  // bn_BD days of week
  equal(tz("2006-01-01", "%A", "bn_BD"), "Sunday", "Sunday");
  equal(tz("2006-01-02", "%A", "bn_BD"), "Monday", "Monday");
  equal(tz("2006-01-03", "%A", "bn_BD"), "Tuesday", "Tuesday");
  equal(tz("2006-01-04", "%A", "bn_BD"), "Wednesday", "Wednesday");
  equal(tz("2006-01-05", "%A", "bn_BD"), "Thursday", "Thursday");
  equal(tz("2006-01-06", "%A", "bn_BD"), "Friday", "Friday");
  equal(tz("2006-01-07", "%A", "bn_BD"), "Saturday", "Saturday");
});
