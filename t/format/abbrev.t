#!/usr/bin/env coffee
require("../proof") 1, ({ tz, utc }) ->
  tz = tz require("../../zones/America/Anchorage")
  @equal tz(utc(1946, 0, 1, 10), "%Z", "America/Anchorage"), "CAT", "stanard"
