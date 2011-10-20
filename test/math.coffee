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
    @equal tz("2010-03-14 12:00", "America/Detroit", "-24 hour", "%c"), "Sat 13 Mar 2010 11:00:00 AM UTC"
    done 1

  "test: subtract minute across spring forward": (done) ->
    @equal tz("2010-03-14 03:00", "America/Detroit", "-1 minute", "%c"), "Sun 14 Mar 2010 01:59:00 AM UTC"
    done 1

  "test: subtract hours across fall back": (done) ->
    @equal tz("2010-11-07 03:00", "America/Detroit", "-61 minute", "%c"), "Sun 07 Nov 2010 01:59:00 AM UTC"
    @equal tz("2010-11-07 03:00", "America/Detroit", "-121 minutes", "%c"), "Sun 07 Nov 2010 01:59:00 AM UTC"
    @equal tz("2010-11-07 02:00", "America/Detroit", "-2 hours", "%c"), "Sun 07 Nov 2010 01:00:00 AM UTC"
    @equal tz("2010-11-07 02:00", "America/Detroit", "-30 minutes", "%c"), "Sun 07 Nov 2010 01:30:00 AM UTC"
    @equal tz("2010-11-07 02:00", "America/Detroit", "-60 minutes", "%c"), "Sun 07 Nov 2010 01:00:00 AM UTC"
    @equal tz("2010-11-07 02:00", "America/Detroit", "-90 minutes", "%c"), "Sun 07 Nov 2010 01:30:00 AM UTC"
    @equal tz("2010-11-07 02:00", "America/Detroit", "-120 minutes", "%c"), "Sun 07 Nov 2010 01:00:00 AM UTC"
    done 2

  "test: add day lands on missing dst start time": (done) ->
    @equal tz("2010-03-13 02:30", "America/Detroit", "+1 day", "%c"), "Sun 14 Mar 2010 01:30:00 AM UTC"
    @equal tz("2010-03-13 03:30", "America/Detroit", "+1 day", "%c"), "Sun 14 Mar 2010 03:30:00 AM UTC"
    done 2

  "test: subtract day to missing dst start time": (done) ->
    @equal tz("2010-03-15 02:30", "America/Detroit", "-1 day", "%c"), "Sun 14 Mar 2010 03:30:00 AM UTC"
    @equal tz("2010-03-15 03:30", "America/Detroit", "-1 day", "%c"), "Sun 14 Mar 2010 03:30:00 AM UTC"
    done 2

  "test: substract by day of week": (done) ->
    @equal tz("2011-10-01", "-1 day", "+2 saturday", "%c"), "Sat 08 Oct 2011 12:00:00 AM UTC"
    done 1
