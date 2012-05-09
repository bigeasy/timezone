#!/usr/bin/env coffee
require("../proof") 3, ({ tz, y2k, utc }) ->
  @equal tz(utc(1980, 0, 1, 0, 0, 1, 1000), "%3N"), "000", "top of hour"
  @equal tz(utc(1980, 0, 1, 0, 0, 1, 999), "%3N"), "999", "last millisecond"
  @equal tz(utc(1980, 0, 1, 0, 0, 1, 3), "%3N"), "003", "padded"
