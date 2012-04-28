#!/usr/bin/env coffee
require("../proof") 3, ({ tz, y2k, utc }) ->
  @equal tz(utc(1980, 0, 1, 0, 0, 1, 1000), "%."), "000", "top of hour"
  @equal tz(utc(1980, 0, 1, 0, 0, 1, 999), "%."), "999", "last millisecond"
  @equal tz(utc(1980, 0, 1, 0, 0, 1, 3), "%."), "003", "padded"
