fs = require "fs"
{TwerpTest} = require "twerp"

{tz} = require "../lib/timezone"

utc = (splat...) -> Date.UTC.apply(null, splat)

class exports.MathTest extends TwerpTest
  "test: subtract day": (done) ->
    @equal tz(utc(2007, 2, 3), "-1 day"), utc(2007, 2, 2)
    done 1

  "test: subtract day across month": (done) ->
    @equal tz(utc(2007, 3, 1), "-1 day"), utc(2007, 2, 31)
    done 1

  "test: subtract day across year": (done) ->
    @equal tz(utc(2007, 0, 1), "-1 day"), utc(2006, 11, 31)
    done 1
