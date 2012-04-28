#!/usr/bin/env coffee
require("../proof") 5, ({ tz, bicentennial, moonwalk }) ->
  tz = tz require "../../date"
  @equal tz(bicentennial, "%D"), "07/04/76", "short date format"
  @equal tz(bicentennial, "%x"), "07/04/1976", "long date format"
  @equal tz(moonwalk, "%r"), "02:36:00 AM", "meridiem time format"
  @equal tz(moonwalk, "%R"), "02:36", "military time format"
  @equal tz(moonwalk, "%T"), "02:36:00", "military time format with seconds"
