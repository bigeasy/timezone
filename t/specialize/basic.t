#!/usr/bin/env coffee
require("../proof") 2, ({ tz }) ->
  tz.timezones require "./../data/northamerica"
  detroit = tz.specialize "America/Detroit"
  @equal detroit(Date.UTC(2000, 0, 1), "%m/%d/%Y %H:%M"), "12/31/1999 19:00", "timezone"
  detroit = detroit.specialize "%m/%d/%Y %H:%M"
  @equal detroit(Date.UTC(2000, 0, 1)), "12/31/1999 19:00", "format and timezone"
