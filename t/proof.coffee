#!/usr/bin/env coffee
context = {}
context.readDate = (date) ->
  [year, month, day] = /^(\d{4})(\d{2})(\d{2})$/.exec(date).slice(1)
  new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10))).getTime()
context.utc = utc = (splat...) -> Date.UTC.apply Date.UTC, splat
context.bicentennial = utc(1976, 6, 4)
context.moonwalk = utc(1969, 6, 21, 2, 36)
context.y2k = utc(2000, 0, 1)
context.tz = require("../timezone")
module.exports = require("proof")(context)
