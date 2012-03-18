#!/usr/bin/env coffee
require("../proof") 3, ({ tz, moonwalk, utc }) ->
  @equal tz(utc(1980, 0, 1, 0, 0, 1), "%S"), "01", "second"
  @equal tz(moonwalk, "%S"), "00", "top of minute"
  @equal tz(utc(1980, 0, 1, 0, 0, 59), "%S"), "59", "last second"
