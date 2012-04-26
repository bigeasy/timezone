#!/usr/bin/env coffee
require("../proof") 3, ({ tz }) ->
  detroit = tz require("../../zones/America/Detroit"), "America/Detroit"
  @equal detroit(tz("1975-01-01 05:00"), "-1 millisecond", "%z"), "-0500", "from UTC before boundary"
  @equal detroit(tz("1975-01-01 05:00"), "%z"), "-0500", "from UTC at boundary"
  @equal detroit(tz("1975-01-01 05:00"), "+1 millisecond", "%z"), "-0500", "from UTC after boundary"
  
