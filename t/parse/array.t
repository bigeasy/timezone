#!/usr/bin/env coffee
require("../proof") 1, ({ tz, utc }) ->
  @equal tz([ 1980, 8, 18 ]), utc(1980, 7, 18), "year, month, date"
