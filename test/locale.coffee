{TwerpTest} = require "twerp"

{tz} = require "../lib/timezone"
tz.timezones require "./data/northamerica"
tz.locales require "../locales/pl_PL"

class exports.LocaleTest extends TwerpTest
  "test: en_US abbreviated days of week": (done) ->
    @equal tz("2006-01-01", "%a", "en_US"), "Sun"
    @equal tz("2006-01-02", "%a", "en_US"), "Mon"
    @equal tz("2006-01-03", "%a", "en_US"), "Tue"
    @equal tz("2006-01-04", "%a", "en_US"), "Wed"
    @equal tz("2006-01-05", "%a", "en_US"), "Thu"
    @equal tz("2006-01-06", "%a", "en_US"), "Fri"
    @equal tz("2006-01-07", "%a", "en_US"), "Sat"
    done 7

  "test: en_US days of week": (done) ->
    @equal tz("2006-01-01", "%A", "en_US"), "Sunday"
    @equal tz("2006-01-02", "%A", "en_US"), "Monday"
    @equal tz("2006-01-03", "%A", "en_US"), "Tuesday"
    @equal tz("2006-01-04", "%A", "en_US"), "Wednesday"
    @equal tz("2006-01-05", "%A", "en_US"), "Thursday"
    @equal tz("2006-01-06", "%A", "en_US"), "Friday"
    @equal tz("2006-01-07", "%A", "en_US"), "Saturday"
    done 7

  "test: en_US abbreviated months": (done) ->
    @equal tz("2000-01-01", "%b", "en_US"), "Jan"
    @equal tz("2000-02-01", "%b", "en_US"), "Feb"
    @equal tz("2000-03-01", "%b", "en_US"), "Mar"
    @equal tz("2000-04-01", "%b", "en_US"), "Apr"
    @equal tz("2000-05-01", "%b", "en_US"), "May"
    @equal tz("2000-06-01", "%b", "en_US"), "Jun"
    @equal tz("2000-07-01", "%b", "en_US"), "Jul"
    @equal tz("2000-08-01", "%b", "en_US"), "Aug"
    @equal tz("2000-09-01", "%b", "en_US"), "Sep"
    @equal tz("2000-10-01", "%b", "en_US"), "Oct"
    @equal tz("2000-11-01", "%b", "en_US"), "Nov"
    @equal tz("2000-12-01", "%b", "en_US"), "Dec"
    done 7

  "test: en_US months": (done) ->
    @equal tz("2000-01-01", "%B", "en_US"), "January"
    @equal tz("2000-02-01", "%B", "en_US"), "February"
    @equal tz("2000-03-01", "%B", "en_US"), "March"
    @equal tz("2000-04-01", "%B", "en_US"), "April"
    @equal tz("2000-05-01", "%B", "en_US"), "May"
    @equal tz("2000-06-01", "%B", "en_US"), "June"
    @equal tz("2000-07-01", "%B", "en_US"), "July"
    @equal tz("2000-08-01", "%B", "en_US"), "August"
    @equal tz("2000-09-01", "%B", "en_US"), "September"
    @equal tz("2000-10-01", "%B", "en_US"), "October"
    @equal tz("2000-11-01", "%B", "en_US"), "November"
    @equal tz("2000-12-01", "%B", "en_US"), "December"
    done 7

  "test: en_US date representation": (done) ->
    @equal tz("2000-09-03", "%x", "en_US"), "09/03/2000"
    done 1

  "test: en_US time representation": (done) ->
    @equal tz("2000-09-03 08:05:04", "%X", "en_US"), "08:05:04 AM"
    @equal tz("2000-09-03 23:05:04", "%X", "en_US"), "11:05:04 PM"
    done 2

  "test: en_US date time representation": (done) ->
    @equal tz("2000-09-03 08:05:04", "%c", "en_US"), "Sun 03 Sep 2000 08:05:04 AM UTC"
    @equal tz("2000-09-03 23:05:04", "%c", "en_US"), "Sun 03 Sep 2000 11:05:04 PM UTC"
    done 2

  "test: pl_PL abbreviated days of week": (done) ->
    @equal tz("2006-01-01", "%a", "pl_PL"), "nie"
    @equal tz("2006-01-02", "%a", "pl_PL"), "pon"
    @equal tz("2006-01-03", "%a", "pl_PL"), "wto"
    @equal tz("2006-01-04", "%a", "pl_PL"), "śro"
    @equal tz("2006-01-05", "%a", "pl_PL"), "czw"
    @equal tz("2006-01-06", "%a", "pl_PL"), "pią"
    @equal tz("2006-01-07", "%a", "pl_PL"), "sob"
    done 7

  "test: pl_PL days of week": (done) ->
    @equal tz("2006-01-01", "%A", "pl_PL"), "niedziela"
    @equal tz("2006-01-02", "%A", "pl_PL"), "poniedziałek"
    @equal tz("2006-01-03", "%A", "pl_PL"), "wtorek"
    @equal tz("2006-01-04", "%A", "pl_PL"), "środa"
    @equal tz("2006-01-05", "%A", "pl_PL"), "czwartek"
    @equal tz("2006-01-06", "%A", "pl_PL"), "piątek"
    @equal tz("2006-01-07", "%A", "pl_PL"), "sobota"
    done 7

  "test: pl_PL abbreviated months": (done) ->
    @equal tz("2000-01-01", "%b", "pl_PL"), "sty"
    @equal tz("2000-02-01", "%b", "pl_PL"), "lut"
    @equal tz("2000-03-01", "%b", "pl_PL"), "mar"
    @equal tz("2000-04-01", "%b", "pl_PL"), "kwi"
    @equal tz("2000-05-01", "%b", "pl_PL"), "maj"
    @equal tz("2000-06-01", "%b", "pl_PL"), "cze"
    @equal tz("2000-07-01", "%b", "pl_PL"), "lip"
    @equal tz("2000-08-01", "%b", "pl_PL"), "sie"
    @equal tz("2000-09-01", "%b", "pl_PL"), "wrz"
    @equal tz("2000-10-01", "%b", "pl_PL"), "paź"
    @equal tz("2000-11-01", "%b", "pl_PL"), "lis"
    @equal tz("2000-12-01", "%b", "pl_PL"), "gru"
    done 7

  "test: pl_PL months": (done) ->
    @equal tz("2000-01-01", "%B", "pl_PL"), "styczeń"
    @equal tz("2000-02-01", "%B", "pl_PL"), "luty"
    @equal tz("2000-03-01", "%B", "pl_PL"), "marzec"
    @equal tz("2000-04-01", "%B", "pl_PL"), "kwiecień"
    @equal tz("2000-05-01", "%B", "pl_PL"), "maj"
    @equal tz("2000-06-01", "%B", "pl_PL"), "czerwiec"
    @equal tz("2000-07-01", "%B", "pl_PL"), "lipiec"
    @equal tz("2000-08-01", "%B", "pl_PL"), "sierpień"
    @equal tz("2000-09-01", "%B", "pl_PL"), "wrzesień"
    @equal tz("2000-10-01", "%B", "pl_PL"), "październik"
    @equal tz("2000-11-01", "%B", "pl_PL"), "listopad"
    @equal tz("2000-12-01", "%B", "pl_PL"), "grudzień"
    done 7

  "test: pl_PL date representation": (done) ->
    @equal tz("2000-09-03", "%x", "pl_PL"), "03.09.2000"
    done 1

  "test: pl_PL time representation": (done) ->
    @equal tz("2000-09-03 08:05:04", "%X", "pl_PL"), "08:05:04"
    @equal tz("2000-09-03 23:05:04", "%X", "pl_PL"), "23:05:04"
    done 2

  "test: pl_PL date time representation": (done) ->
    @equal tz("2000-09-03 08:05:04", "%c", "pl_PL"), "nie, 3 wrz 2000, 08:05:04 UTC"
    @equal tz("2000-09-03 23:05:04", "%c", "pl_PL"), "nie, 3 wrz 2000, 23:05:04 UTC"
    done 2
