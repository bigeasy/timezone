#!/usr/bin/env node
require("../proof")(3, function (equal, tz, utc, moonwalk) {
  equal(tz([ 1980, 8, 18 ]), utc(1980, 7, 18), "year, month, date");
  equal(tz([ 1969, 7, 21, 2, 56 ]), moonwalk, "moonwalk");
  tz = tz(require("timezone/America/Detroit"));
  equal(tz([ 1969, 7, 20, 21, 56 ], "America/Detroit"), moonwalk, "moonwalk in Detroit");
});
