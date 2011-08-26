fs = require "fs"
{TwerpTest} = require "twerp"
{tz} = require "timezone"
tz.timezones require "./data/northamerica"

class exports.CurryTest extends TwerpTest
  testCurry: (done) ->
    detroit = tz.curry "America/Detroit"
    @equal detroit(Date.UTC(2000, 0, 1), "%m/%d/%Y %H:%M"), "12/31/1999 19:00"
    detroit = detroit.curry "%m/%d/%Y %H:%M"
    @equal detroit(Date.UTC(2000, 0, 1)), "12/31/1999 19:00"
    done 2
