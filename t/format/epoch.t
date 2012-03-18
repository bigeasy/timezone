#!/usr/bin/env coffee
require("../proof") 3, ({ tz, y2k, moonwalk, utc }) ->
  @equal tz(utc(1970, 0, 4, 5, 0, 1), "%s"), "277201", "shortly after epoch"
  @equal tz(moonwalk, "%s"), "-14160240", "moonwalk epoch"
  @equal tz(y2k, "%s"), "946684800", "y2k epoch"
