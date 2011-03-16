{TwerpTest} = require "twerp"

{tz} = require "timezone"

bicentenial = new Date(Date.UTC(1976, 6, 4))
moonwalk = new Date(Date.UTC(1969, 6, 21, 02, 36))
y2k = new Date(Date.UTC(2000, 0, 1))

class exports.FormatTest extends TwerpTest
  testWeekdayShort: ( done ) ->
    @equal tz("%a", bicentenial), "Sun"
    done 1

  testPercentsFrontAndBack: ( done ) ->
    @equal tz("%%a%", bicentenial), "%Sun%"
    @equal tz("%%%a%%", bicentenial), "%%Sun%%"
    done 2

  testWeekdayLong: ( done ) ->
    @equal tz("%A", bicentenial), "Sunday"
    done 1

  testDate: (done) ->
    @equal tz("%d", bicentenial), "04"
    done 1

  testDateUnpadded: (done) ->
    @equal tz("%-d", bicentenial), "4"
    done 1

  testDateSpacePadded: (done) ->
    @equal tz("%_d", bicentenial), " 4"
    done 1

  testDateSingleDigit: (done) ->
    @equal tz("%e", bicentenial), "4"
    done 1

  testDayOfYear: (done) ->
    @equal tz("%j", y2k), "001"
    @equal tz("%j", moonwalk), "202"
    @equal tz("%j", bicentenial), "186"
    done 3

  testDayOfTheWeekStartingMonday: (done) ->
    @equal tz("%u", y2k), "6"
    @equal tz("%u", moonwalk), "1"
    @equal tz("%u", bicentenial), "7"
    done 3

  testDayOfTheWeekStartingSunday: (done) ->
    @equal tz("%w", y2k), "6"
    @equal tz("%w", moonwalk), "1"
    @equal tz("%w", bicentenial), "0"
    done 3
