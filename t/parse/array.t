#!/usr/bin/env node
require("../proof")(1, function (equal, tz, utc) {
  equal(tz([ 1980, 8, 18 ]), utc(1980, 7, 18), "year, month, date");
});
