#!/usr/bin/env coffee
require("../proof") 1, ({ tz, bicentennial }) ->
  tz = tz require("../../date")
  @equal tz(bicentennial, "%C"), "19", "century"
