#!/usr/bin/env coffee
require("../proof") 2, ({ tz }) ->
  detroit = tz require("timezone/America/Detroit"), "America/Detroit"
  @equal detroit(Date.UTC(2000, 0, 1), "%m/%d/%Y %H:%M"), "12/31/1999 19:00", "timezone"
  detroit = detroit "%m/%d/%Y %H:%M"
  @equal detroit(Date.UTC(2000, 0, 1)), "12/31/1999 19:00", "format and timezone"
