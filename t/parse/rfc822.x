#!/usr/bin/env coffee
require("../proof") 1, ({ tz, utc  }) ->
  @equal tz("Sat, 13 Aug 2011 10:24:20 -0400"), utc(2011, 7, 13, 14, 24, 20), "rfc822"
