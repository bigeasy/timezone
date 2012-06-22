#!/usr/bin/env node
require("../proof")(5, function (equal, tz) {
  equal(tz("1945-08-14 18:59:00", "America/Detroit", "%Z"), "UTC", "Detroit not loaded");

  var detroit = tz(require("timezone/America"));
  equal(detroit("1945-08-14 18:59:00", "America/Detroit", "%Z"), "EWT", "Detroit loaded from America");
  equal(detroit("1916-01-03", "Europe/Vilnius", "%Z"), "UTC", "Vilnius missing from America");

  var world = tz(require("timezone/zones"), "America/Detroit");
  equal(world("1945-08-14 18:59:00", "America/Detroit", "%Z"), "EWT", "Detroit loaded from World");
  equal(world("1916-01-03", "Europe/Vilnius", "%Z"), "WMT", "Vilnius loaded from World");
});
