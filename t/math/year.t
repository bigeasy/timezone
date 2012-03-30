#!/usr/bin/env coffee
require("../proof") 4, ({ tz, moonwalk, utc }) ->
  @equal tz(moonwalk, "+2 years"), utc(1971, 6, 21, 02, 36), "add years"
  @equal tz(moonwalk, "-2 years"), utc(1967, 6, 21, 02, 36), "subtract years across leap year"
  @equal tz(utc(1980, 1, 29, 12), "+1 year"), utc(1981, 2, 1, 12), "add years from leap day"
  @equal tz(utc(1980, 1, 29, 12), "-1 year"), utc(1979, 2, 1, 12), "subtract years from leap day"
