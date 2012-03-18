#!/usr/bin/env coffee
require("../proof") 1, ({ tz }) ->
  tz.clock -> 0
  @equal tz(tz.now), 0, "set"
