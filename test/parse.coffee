fs = require "fs"
{TwerpTest} = require "twerp"

{tz} = require "../lib/timezone"

class exports.ParseTest extends TwerpTest
  "test: parse RFC 822 time": (done) ->
    @equal tz("Sat, 13 Aug 2011 10:24:20 -0400"), Date.UTC(2011, 7, 13, 14, 24, 20)
    done 1

  "test: parse ISO year and month with hyphen": (done) ->
    @equal tz("1980-01"), Date.UTC(1980, 0, 1)
    done 1

  "test: parse ISO year, month and day with hyphen": (done) ->
    @equal tz("1980-01-02"), Date.UTC(1980, 0, 2)
    done 1

  "test: parse ISO year and month without hyphen": (done) ->
    @equal tz("198001"), Date.UTC(1980, 0, 1)
    done 1

  "test: parse ISO year, month and day without hyphen": (done) ->
    @equal tz("19800102"), Date.UTC(1980, 0, 2)
    done 1

  "test: parse ISO year, month and hours with hyphen": (done) ->
    @equal tz("198001T02"), Date.UTC(1980, 0, 1, 2)
    @equal tz("198001 02"), Date.UTC(1980, 0, 1, 2)
    done 2

  "test: parse ISO year, month, day and hours with hyphen": (done) ->
    @equal tz("19800103T02"), Date.UTC(1980, 0, 3, 2)
    @equal tz("19800103 02"), Date.UTC(1980, 0, 3, 2)
    done 2

  "test: parse ISO year, month and hours without hyphen": (done) ->
    @equal tz("198001T02"), Date.UTC(1980, 0, 1, 2)
    @equal tz("198001 02"), Date.UTC(1980, 0, 1, 2)
    done 2

  "test: parse ISO year, month and hours without hyphen": (done) ->
    @equal tz("19800103T02"), Date.UTC(1980, 0, 3, 2)
    @equal tz("19800103 02"), Date.UTC(1980, 0, 3, 2)
    done 2

  "test: parse ISO year, month, hours and minutes": (done) ->
    @equal tz("19800103T0215"), Date.UTC(1980, 0, 3, 2, 15)
    @equal tz("19800103 0215"), Date.UTC(1980, 0, 3, 2, 15)
    @equal tz("1980-01-03T02:15"), Date.UTC(1980, 0, 3, 2, 15)
    @equal tz("1980-01-03 02:15"), Date.UTC(1980, 0, 3, 2, 15)
    done 4

  "test: parse ISO year, month, hours, minutes and seconds": (done) ->
    @equal tz("19800103T02:15:21"), Date.UTC(1980, 0, 3, 2, 15, 21)
    @equal tz("19800103 02:15:21"), Date.UTC(1980, 0, 3, 2, 15, 21)
    @equal tz("1980-01-03T02:15:21"), Date.UTC(1980, 0, 3, 2, 15, 21)
    @equal tz("1980-01-03 02:15:21"), Date.UTC(1980, 0, 3, 2, 15, 21)
    done 4

  "test: parse ISO year, month, hours, minutes, seconds and millis": (done) ->
    @equal tz("19800103T021521.2"), Date.UTC(1980, 0, 3, 2, 15, 21, 2)
    @equal tz("19800103 021521.2"), Date.UTC(1980, 0, 3, 2, 15, 21, 2)
    @equal tz("1980-01-03T02:15:21.2"), Date.UTC(1980, 0, 3, 2, 15, 21, 2)
    @equal tz("1980-01-03 02:15:21.2"), Date.UTC(1980, 0, 3, 2, 15, 21, 2)
    done 4

  "test: parse US formatted date": (done) ->
    @equal tz("6/21/1969"), Date.UTC(1969, 5, 21)
    @equal tz("21/6/1969"), Date.UTC(1969, 5, 21)
    @equal tz("7/4/1976"), Date.UTC(1976, 6, 4)
    @equal tz("4/7/1976"), Date.UTC(1976, 3, 7)
    done 1

  "test: parse year first date": (done) ->
    @equal tz("1969/6/21"), Date.UTC(1969, 5, 21)
    @equal tz("1976/7/4"), Date.UTC(1976, 6, 4)
    done 1
