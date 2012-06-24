#!/usr/bin/env node
require("../proof")(6, function (equal, tz) {
  try {
    tz("1945-08-14 18:59:00", "America/Detroit", "%Z")
  } catch (e) {
    equal(e.message , "invalid zone: America/Detroit", "Detroit not loaded");
  }
  equal(tz("1945-08-14 18:59:00", "America/Detroit", "%Z", require("timezone/America/Detroit")), "EWT", "Detroit loaded immediately");

  var detroit = tz(require("timezone/America"));
  equal(detroit("1945-08-14 18:59:00", "America/Detroit", "%Z"), "EWT", "Detroit loaded from America");
  try {
    detroit("1916-01-03", "Europe/Vilnius", "%Z")
  } catch (e) {
    equal(e.message , "invalid zone: Europe/Vilnius", "Vilnius missing from America");
  }

  var world = tz(require("timezone/zones"), "America/Detroit");
  equal(world("1945-08-14 18:59:00", "America/Detroit", "%Z"), "EWT", "Detroit loaded from World");
  equal(world("1916-01-03", "Europe/Vilnius", "%Z"), "WMT", "Vilnius loaded from World");
});
