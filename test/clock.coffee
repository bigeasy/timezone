fs = require "fs"
{TwerpTest} = require "twerp"

{tz} = require "../lib/timezone"

class exports.ClockTest extends TwerpTest
  "test: set time from clock": (done) ->
    tz.clock -> 0
    @equal tz(tz.now), 0
    done 1
