#!/usr/bin/env coffee
require("../proof") 3, ({ tz, bicentennial }) ->
  @equal tz(bicentennial, "%%"), "%", "escaped percent sign"
  @equal tz(bicentennial, "%%%d%"), "%04%", "percents front"
  @equal tz(bicentennial, "%%%d%%"), "%04%", "percents front and back"
