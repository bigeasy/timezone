#!/usr/bin/env coffee
lines = require("fs").readFileSync("#{__dirname}/../../../zones/transitions.txt", "utf8").split(/\n/)
lines.pop()
require("../../proof") lines.length * 2, ({ tz }) ->
  # TODO Not automatically applying zone.
  partials = {}
  for line, index in lines
    [ name, wallclock, posix, before, after ] = line.split(/\s/)
    local = (partials[name] or= tz require "timezone/#{name}", name)
    @equal local(tz(posix, "%F %T%$", "-1 millisecond"), name, "%::z/%Z"), before, "#{name} #{wallclock} #{posix} #{before} before #{local(tz(posix, "%F %T%$", "-1 millisecond"), name, "%::z/%Z")} #{tz(posix, "-1 millisecond")}"
    @equal local(tz(posix, "%F %T%$"), name, "%::z/%Z"), after, "#{name} #{wallclock} #{posix} #{after} after #{local(tz(posix, "%F %T%$"), name, "%::z/%Z")}"
