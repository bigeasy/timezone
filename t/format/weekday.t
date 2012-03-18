#!/usr/bin/env coffee
require("../proof") 2, ({ tz, bicentennial }) ->
  @equal tz(bicentennial, "%a"), "Sun", "weekday short"
  @equal tz(bicentennial, "%A"), "Sunday", "weekday long"
