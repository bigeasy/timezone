#!/usr/bin/env coffee
require("../proof") 6, ({ tz, utc }) ->
  @equal tz("6/21/1969"), Date.UTC(1969, 5, 21), "month first moonwalk"
  @equal tz("21/6/1969"), Date.UTC(1969, 5, 21), "date first moonwalk"
  @equal tz("7/4/1976"), Date.UTC(1976, 6, 4), "month first bicentennial"
  @equal tz("4/7/1976"), Date.UTC(1976, 3, 7), "date first bicentennial"
  @equal tz("1969/6/21"), Date.UTC(1969, 5, 21), "year first moonwalk"
  @equal tz("1976/7/4"), Date.UTC(1976, 6, 4), "year first bicentennial"
