#!/usr/bin/env coffee
require("../proof") 1, ({ tz, utc }) ->
  # TODO use different timestamp
  @equal tz("2011-10-01", "-1 day", "+2 saturday", "%c"), "Sat 08 Oct 2011 12:00:00 AM UTC", "substract by day of week"
