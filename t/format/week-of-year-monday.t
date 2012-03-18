#!/usr/bin/env coffee
require("../proof") 14640, ({ tz, readDate }) ->
  formatted = "#{__dirname}/../data/format"
  lines = require("fs").readFileSync("#{formatted}/W", "utf8").split(/\n/)
  lines.pop()
  for line in lines
    [date, dayOfYear] = line.split /\s+/
    @equal tz(readDate(date), "%W"), dayOfYear, "week of year monday #{date}"
