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

  "test: add month": (done) ->
    @equal tz(utc(2007, 2, 3), "+1 month"), utc(2007, 3, 3)
    done 1

  "test: add month across year": (done) ->
    @equal tz(utc(2007, 11, 3), "+1 month"), utc(2008, 0, 3)
    done 1

  "test: subtract hours spring forward": (done) ->
    @equal tz("2010-03-14 12:00", "America/Detroit", "-24 hour", "%c"), "Sat Mar 13 11:00:00 2010"
    done 1

  "test: subtract minute across spring forward": (done) ->
    @equal tz("2010-03-14 03:00", "America/Detroit", "-1 minute", "%c"), "Sun Mar 14 01:59:00 2010"
    done 1

  "test: subtract hours across fall back": (done) ->
    @equal tz("2010-11-07 03:00", "America/Detroit", "-61 minute", "%c"), "Sun Nov  7 01:59:00 2010"
    @equal tz("2010-11-07 03:00", "America/Detroit", "-121 minutes", "%c"), "Sun Nov  7 01:59:00 2010"
    @equal tz("2010-11-07 02:00", "America/Detroit", "-2 hours", "%c"), "Sun Nov  7 01:00:00 2010"
    @equal tz("2010-11-07 02:00", "America/Detroit", "-30 minutes", "%c"), "Sun Nov  7 01:30:00 2010"
    @equal tz("2010-11-07 02:00", "America/Detroit", "-60 minutes", "%c"), "Sun Nov  7 01:00:00 2010"
    @equal tz("2010-11-07 02:00", "America/Detroit", "-90 minutes", "%c"), "Sun Nov  7 01:30:00 2010"
    @equal tz("2010-11-07 02:00", "America/Detroit", "-120 minutes", "%c"), "Sun Nov  7 01:00:00 2010"
    done 2

  "test: add day lands on missing dst start time": (done) ->
    @equal tz("2010-03-13 02:30", "America/Detroit", "+1 day", "%c"), "Sun Mar 14 01:30:00 2010"
    @equal tz("2010-03-13 03:30", "America/Detroit", "+1 day", "%c"), "Sun Mar 14 03:30:00 2010"
    done 2

  "test: subtract day to missing dst start time": (done) ->
    @equal tz("2010-03-15 02:30", "America/Detroit", "-1 day", "%c"), "Sun Mar 14 03:30:00 2010"
    @equal tz("2010-03-15 03:30", "America/Detroit", "-1 day", "%c"), "Sun Mar 14 03:30:00 2010"
    done 2
