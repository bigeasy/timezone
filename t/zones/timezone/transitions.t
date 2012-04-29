#!/usr/bin/env coffee
lines = require("fs").readFileSync("#{__dirname}/../../../iana/zones.txt", "utf8").split(/\n/)
lines.pop()
require("../../proof") lines.length * 2, ({ tz }) ->
  # TODO Not automatically applying zone.
  partials = {}
  for line, index in lines
    [ name, wallclock, posix, before, after ] = line.split(/\s/)
    local = (partials[name] or= tz require "#{__dirname}/../../../zones/#{name}", name)
    @ok local(tz(posix, "%F %T%$", "-1 millisecond"), name, "%::z/%Z"), before, "#{name} #{wallclock} #{posix} before"
    @ok local(tz(posix, "%F %T%$"), name, "%::z/%Z"), after, "#{name} #{wallclock} #{posix} after"
