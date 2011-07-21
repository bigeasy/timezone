fs = require "fs"
{TwerpTest} = require "twerp"

{tz} = require "../lib/timezone"
tz.timezones require "./data/northamerica"

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

  "test: add day": (done) ->
    @equal tz(utc(2007, 2, 3), "+1 day"), utc(2007, 2, 4)
    done 1

  "test: add day across month": (done) ->
    @equal tz(utc(2007, 2, 31), "+366 day"), utc(2008, 2, 31)
    done 1

  "test: subtract hours across timezone": (done) ->
    @equal tz("2010-03-14 12:00", "America/Detroit", "-24 hour", "%c"), "Sat Mar 13 11:00:00 2010"
    done 1

  "test: subtract minutes across timezone": (done) ->
    @equal tz("2010-03-14 03:00", "America/Detroit", "-1 minute", "%c"), "Sun Mar 14 01:59:00 2010"
    done 1
