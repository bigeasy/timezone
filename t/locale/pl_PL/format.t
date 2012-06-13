#!/usr/bin/env coffee
require("../../proof") 5, ({ tz }) ->
  tz = tz require("../../../locales/pl_PL")
  @equal tz("2000-09-03", "%x", "pl_PL"), "03.09.2000", "date"
  @equal tz("2000-09-03 08:05:04", "%X", "pl_PL"), "08:05:04", "time, padding apparent"
  @equal tz("2000-09-03 23:05:04", "%X", "pl_PL"), "23:05:04", "time"
  @equal tz("2000-09-03 08:05:04", "%c", "pl_PL"), "nie, 3 wrz 2000, 08:05:04 UTC", "date, padding apparent"
  @equal tz("2000-09-03 23:05:04", "%c", "pl_PL"), "nie, 3 wrz 2000, 23:05:04 UTC", "date"
