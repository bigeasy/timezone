#!/usr/bin/env coffee
require("../proof") 1, ({ tz }) ->
  tz = tz -> @clock = -> 0
  @equal tz(), 0, "set"
