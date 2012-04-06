#!/usr/bin/env coffee
require("../proof") 8, ({ tz, moonwalk }) ->
  tz = tz require "../../timezones/europe"
  tz = tz require "../../timezones/northamerica"
  detroit = tz "America/Detroit"
  @equal detroit(tz("1905-01-01 05:32:11"), "%z"), "-0600", "seconds"
  @equal detroit(tz("1905-01-01 05:32:11"), "-1 millisecond", "%z"), "-0532", "seconds truncated"
  @equal detroit(tz("1905-01-01 05:32:11"), "%:z"), "-06:00", "minutes with colon"
  @equal detroit(tz("1905-01-01 05:32:11"), "-1 millisecond", "%:z"), "-05:32", "minutes with colon truncated"
  @equal detroit(tz("1905-01-01 05:32:11"), "%::z"), "-06:00:00", "unneeded seconds with colon"
  @equal detroit(tz("1905-01-01 05:32:11"), "-1 millisecond", "%::z"), "-05:32:11", "seconds with colon"
  @equal detroit(tz("1905-01-01 05:32:11"), "%:::z"), "-06", "enough colons"
  @equal detroit(tz("1905-01-01 05:32:11"), "-1 millisecond", "%:::z"), "-05:32:11", "more than enough colons"

  # The DST abbreviation changes entirely in Amsterdam in 1916.
  process.exit 0
  @bailout()
  @equal tz("19-01-03", "Europe/Amsterdam", "%Z"), "AMT", "dst full abbrev change back"
  @equal tz("1916-01-03", "Europe/Amsterdam", "%Z"), "AMT", "dst full abbrev change back"
  @equal tz("1916-07-03", "Europe/Amsterdam", "%Z"), "NST", "dst full abbrev change forward"
  @equal tz("1916-11-03", "Europe/Amsterdam", "%Z"), "AMT", "dst full abbrev change back"

  tz = tz require "../../timezones/northamerica"

  # Detroit did not observe DST in 1969. There is no rule in effect for 1969, so
  # we use the formatting information for the last rule change to set the
  # abbrevation variable.
  @equal tz(moonwalk, "America/Detroit", "%Z"), "EST", "format no rule in effect"
  # Detroit did observe DST for a the year 1967.
  @equal tz(moonwalk, "-2 years", "America/Detroit", "%Z"), "EDT", "format with letter"
