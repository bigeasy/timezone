#!/usr/bin/env coffee
require("../proof") 14640, ({ tz, readDate }) ->
  tz = tz require "../../date"
  formatted = "#{__dirname}/../data/format"
  lines = require("fs").readFileSync("#{formatted}/U", "utf8").split(/\n/)
  lines.pop()
  for line in lines
    [date, dayOfYear] = line.split /\s+/
    @equal tz(readDate(date), "%U"), dayOfYear, "week of year sunday #{date}"
