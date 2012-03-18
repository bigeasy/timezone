#!/usr/bin/env coffee
require("../proof") 3, ({ tz, bicentennial }) ->
  @equal tz(bicentennial, "%%"), "%", "escaped percent sign"
  @equal tz(bicentennial, "%%%a%"), "%Sun%", "percents front"
  @equal tz(bicentennial, "%%%a%%"), "%Sun%", "percents front and back"
