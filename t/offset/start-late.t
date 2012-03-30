#!/usr/bin/env coffee
require("../proof") 6, ({ tz, utc }) ->
  tz = tz require "./../data/northamerica"
  detroit = tz "America/Detroit"
  @throws /invalid date/, -> tz(detroit("1975-04-27 02:59:00"), "%c")
  @equal tz(detroit("1975-04-27 01:59:00"), "%c"), "Sun 27 Apr 1975 06:59:00 AM UTC", "start late to UTC"
  @equal tz(detroit("1975-04-27 03:00:00"), "%c"), "Sun 27 Apr 1975 07:00:00 AM UTC", "start late to UTC"

  @equal detroit(tz("1975-04-27T07:00:00"), "-1 millisecond", "%z"), "-0500", "before start late"
  @equal detroit(tz("1975-04-27T07:00:00"), "%z"), "-0400", "start late"
  @equal detroit(tz("1975-04-27T07:00:00"), "+1 millisecond", "%z"), "-0400", "after start late"
