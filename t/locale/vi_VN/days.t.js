#!/usr/bin/env node
require("proof")(14, function (equal) {
  var tz = require("timezone")(require("timezone/vi_VN"));
  // vi_VN abbreviated days of week
  equal(tz("2006-01-01", "%a", "vi_VN"), "Sun", "Sun");
  equal(tz("2006-01-02", "%a", "vi_VN"), "Mon", "Mon");
  equal(tz("2006-01-03", "%a", "vi_VN"), "Tue", "Tue");
  equal(tz("2006-01-04", "%a", "vi_VN"), "Wed", "Wed");
  equal(tz("2006-01-05", "%a", "vi_VN"), "Thu", "Thu");
  equal(tz("2006-01-06", "%a", "vi_VN"), "Fri", "Fri");
  equal(tz("2006-01-07", "%a", "vi_VN"), "Sat", "Sat");

  // vi_VN days of week
  equal(tz("2006-01-01", "%A", "vi_VN"), "Sunday", "Sunday");
  equal(tz("2006-01-02", "%A", "vi_VN"), "Monday", "Monday");
  equal(tz("2006-01-03", "%A", "vi_VN"), "Tuesday", "Tuesday");
  equal(tz("2006-01-04", "%A", "vi_VN"), "Wednesday", "Wednesday");
  equal(tz("2006-01-05", "%A", "vi_VN"), "Thursday", "Thursday");
  equal(tz("2006-01-06", "%A", "vi_VN"), "Friday", "Friday");
  equal(tz("2006-01-07", "%A", "vi_VN"), "Saturday", "Saturday");
});
