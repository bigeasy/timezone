#!/usr/bin/env node
require("proof")(14, function (equal) {
  var tz = require("timezone")(require("timezone/sq_AL"));
  // sq_AL abbreviated days of week
  equal(tz("2006-01-01", "%a", "sq_AL"), "Die", "Sun");
  equal(tz("2006-01-02", "%a", "sq_AL"), "Hën", "Mon");
  equal(tz("2006-01-03", "%a", "sq_AL"), "Mar", "Tue");
  equal(tz("2006-01-04", "%a", "sq_AL"), "Mër", "Wed");
  equal(tz("2006-01-05", "%a", "sq_AL"), "Enj", "Thu");
  equal(tz("2006-01-06", "%a", "sq_AL"), "Pre", "Fri");
  equal(tz("2006-01-07", "%a", "sq_AL"), "Sht", "Sat");

  // sq_AL days of week
  equal(tz("2006-01-01", "%A", "sq_AL"), "e", "Sunday");
  equal(tz("2006-01-02", "%A", "sq_AL"), "diel", "Monday");
  equal(tz("2006-01-03", "%A", "sq_AL"), "e", "Tuesday");
  equal(tz("2006-01-04", "%A", "sq_AL"), "hënë", "Wednesday");
  equal(tz("2006-01-05", "%A", "sq_AL"), "e", "Thursday");
  equal(tz("2006-01-06", "%A", "sq_AL"), "martë", "Friday");
  equal(tz("2006-01-07", "%A", "sq_AL"), "e", "Saturday");
});
