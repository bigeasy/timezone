#!/usr/bin/env coffee
require("../proof") 1, ({ tz, bicentennial }) ->
  @equal tz(bicentennial, "%C"), "19", "century"
