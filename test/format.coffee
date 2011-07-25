fs = require "fs"
{TwerpTest} = require "twerp"

{tz} = require "timezone"

utc = (splat...) -> new Date(Date.UTC.apply(null, splat))

bicentenial = utc(1976, 6, 4)
moonwalk = utc(1969, 6, 21, 02, 36)
y2k = utc(2000, 0, 1)

MINUTE = 60 * 1000
HOUR = MINUTE * 60
DAY = HOUR * 24

readDate = (date) ->
  [year, month, day] = /^(\d{4})(\d{2})(\d{2})$/.exec(date).slice(1)
  new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)))

class exports.FormatTest extends TwerpTest
  testPercent: ( done ) ->
    @equal tz(bicentenial, "%%"), "%"
    done 1

  testWeekdayShort: ( done ) ->
    @equal tz(bicentenial, "%a"), "Sun"
    done 1

  testPercentsFrontAndBack: ( done ) ->
    @equal tz(bicentenial, "%%%a%"), "%Sun%"
    @equal tz(bicentenial, "%%%a%%"), "%Sun%"
    done 2

  testWeekdayLong: ( done ) ->
    @equal tz(bicentenial, "%A"), "Sunday"
    done 1

  testDate: (done) ->
    @equal tz(bicentenial, "%d"), "04"
    done 1

  testDateUnpadded: (done) ->
    @equal tz(bicentenial, "%-d"), "4"
    done 1

  testDateSpacePadded: (done) ->
    @equal tz(bicentenial, "%_d"), " 4"
    done 1

  testDateSingleDigit: (done) ->
    @equal tz(bicentenial, "%e"), "4"
    done 1

  testDayOfYear: (done) ->
    @equal tz(y2k, "%j"), "001"
    @equal tz(moonwalk, "%j"), "202"
    @equal tz(bicentenial, "%j"), "186"
    done 3

  testDayOfTheWeekStartingMonday: (done) ->
    @equal tz(y2k, "%u"), "6"
    @equal tz(moonwalk, "%u"), "1"
    @equal tz(bicentenial, "%u"), "7"
    done 3

  testDayOfTheWeekStartingSunday: (done) ->
    @equal tz(y2k, "%w"), "6"
    @equal tz(moonwalk, "%w"), "1"
    @equal tz(bicentenial, "%w"), "0"
    done 3

  testWeekOfYearStartingSunday: (done) ->
    lines = fs.readFileSync("#{__dirname}/data/format/U", "utf8").split(/\n/)
    lines.pop()
    for line in lines
      [date, dayOfYear] = line.split /\s+/
      @equal tz(readDate(date), "%U"), dayOfYear
    done lines.length

  testWeekOfYearStartingMonday: (done) ->
    lines = fs.readFileSync("#{__dirname}/data/format/W", "utf8").split(/\n/)
    lines.pop()
    for line in lines
      [date, dayOfYear] = line.split /\s+/
      @equal tz(readDate(date), "%W"), dayOfYear
    done lines.length

  testISOWeekNumber: (done) ->
    lines = fs.readFileSync("#{__dirname}/data/format/V", "utf8").split(/\n/)
    lines.pop()
    for line in lines
      [date, dayOfYear] = line.split /\s+/
      @equal tz(readDate(date), "%V"), dayOfYear
    done lines.length

  testISOWeekShortYear: (done) ->
    lines = fs.readFileSync("#{__dirname}/data/format/G", "utf8").split(/\n/)
    lines.pop()
    for line in lines
      [date, dayOfYear] = line.split /\s+/
      @equal tz(readDate(date), "%G"), dayOfYear
    done lines.length

  testISOWeekLongYear: (done) ->
    lines = fs.readFileSync("#{__dirname}/data/format/_g", "utf8").split(/\n/)
    lines.pop()
    for line in lines
      [date, dayOfYear] = line.split /\s+/
      @equal tz(readDate(date), "%g"), dayOfYear
    done lines.length

  testMonth: (done) ->
    @equal tz(moonwalk, "%m"), "07"
    @equal tz(y2k, "%m"), "01"
    done 2

  testShortMonth: (done) ->
    @equal tz(moonwalk, "%h"), "Jul"
    @equal tz(moonwalk, "%b"), "Jul"
    @equal tz(utc(1980, 0, 1), "%b"), "Jan"
    @equal tz(utc(1980, 1, 1), "%b"), "Feb"
    @equal tz(utc(1980, 2, 1), "%b"), "Mar"
    @equal tz(utc(1980, 3, 1), "%b"), "Apr"
    @equal tz(utc(1980, 4, 1), "%b"), "May"
    @equal tz(utc(1980, 5, 1), "%b"), "Jun"
    @equal tz(utc(1980, 6, 1), "%b"), "Jul"
    @equal tz(utc(1980, 7, 1), "%b"), "Aug"
    @equal tz(utc(1980, 8, 1), "%b"), "Sep"
    @equal tz(utc(1980, 9, 1), "%b"), "Oct"
    @equal tz(utc(1980, 10, 1), "%b"), "Nov"
    @equal tz(utc(1980, 11, 1), "%b"), "Dec"
    done 14

  testLongMonth: (done) ->
    @equal tz(moonwalk, "%B"), "July"
    @equal tz(utc(1980, 0, 1), "%B"), "January"
    @equal tz(utc(1980, 1, 1), "%B"), "February"
    @equal tz(utc(1980, 2, 1), "%B"), "March"
    @equal tz(utc(1980, 3, 1), "%B"), "April"
    @equal tz(utc(1980, 4, 1), "%B"), "May"
    @equal tz(utc(1980, 5, 1), "%B"), "June"
    @equal tz(utc(1980, 6, 1), "%B"), "July"
    @equal tz(utc(1980, 7, 1), "%B"), "August"
    @equal tz(utc(1980, 8, 1), "%B"), "September"
    @equal tz(utc(1980, 9, 1), "%B"), "October"
    @equal tz(utc(1980, 10, 1), "%B"), "November"
    @equal tz(utc(1980, 11, 1), "%B"), "December"
    done 13

  testShortYear: (done) ->
    @equal tz(y2k, "%y"), "00"
    @equal tz(bicentenial, "%y"), "76"
    done 2

  testLongYear: (done) ->
    @equal tz(y2k, "%Y"), "2000"
    @equal tz(bicentenial, "%Y"), "1976"
    done 2

  testCentury: (done) ->
    @equal tz(bicentenial, "%C"), "19"
    done 1

  testShortFormat: (done) ->
    @equal tz(bicentenial, "%D"), "07/04/76"
    done 1

  testLocaleFormat: (done) ->
    @equal tz(bicentenial, "%x"), "07/04/76"
    done 1

  testLongFormat: (done) ->
    @equal tz(bicentenial, "%F"), "1976-07-04"
    done 1

  testDialHours: (done) ->
    @equal tz(utc(2011, 0, 1, 0), "%l"), "12"
    @equal tz(utc(2011, 0, 1, 1), "%l"), "1"
    @equal tz(utc(2011, 0, 1, 12), "%l"), "12"
    @equal tz(utc(2011, 0, 1, 13), "%l"), "1"
    done 4

  testDialHoursPadded: (done) ->
    @equal tz(utc(2011, 0, 1, 0), "%I"), "12"
    @equal tz(utc(2011, 0, 1, 1), "%I"), "01"
    @equal tz(utc(2011, 0, 1, 12), "%I"), "12"
    @equal tz(utc(2011, 0, 1, 13), "%I"), "01"
    done 4

  testMilitaryHours: (done) ->
    @equal tz(utc(2011, 0, 1, 0), "%k"), " 0"
    @equal tz(utc(2011, 0, 1, 1), "%k"), " 1"
    @equal tz(utc(2011, 0, 1, 12), "%k"), "12"
    @equal tz(utc(2011, 0, 1, 13), "%k"), "13"
    done 4

  testMilitaryHoursPadded: (done) ->
    @equal tz(utc(2011, 0, 1, 0), "%H"), "00"
    @equal tz(utc(2011, 0, 1, 1), "%H"), "01"
    @equal tz(utc(2011, 0, 1, 12), "%H"), "12"
    @equal tz(utc(2011, 0, 1, 13), "%H"), "13"
    done 4

  testMeridiem: (done) ->
    @equal tz(utc(2011, 0, 1, 0), "%P"), "am"
    @equal tz(utc(2011, 0, 1, 1), "%P"), "am"
    @equal tz(utc(2011, 0, 1, 12), "%P"), "pm"
    @equal tz(utc(2011, 0, 1, 13), "%P"), "pm"
    done 4

  testUppercaseMeridiem: (done) ->
    @equal tz(utc(2011, 0, 1, 0), "%p"), "AM"
    @equal tz(utc(2011, 0, 1, 1), "%p"), "AM"
    @equal tz(utc(2011, 0, 1, 12), "%p"), "PM"
    @equal tz(utc(2011, 0, 1, 13), "%p"), "PM"
    done 4

  testMinutes: (done) ->
    @equal tz(utc(2011, 0, 1, 0, 0), "%M"), "00"
    @equal tz(utc(2011, 0, 1, 0, 1), "%M"), "01"
    @equal tz(utc(2011, 0, 1, 0, 59), "%M"), "59"
    done 3

  testEpochSeconds: (done) ->
    @equal tz(utc(1970, 0, 4, 5, 0, 1), "%s"), "277201"
    @equal tz(moonwalk, "%s"), "-14160240"
    @equal tz(y2k, "%s"), "946684800"
    done 3

  testSeconds: (done) ->
    @equal tz(utc(1980, 0, 1, 0, 0, 1), "%S"), "01"
    @equal tz(moonwalk, "%S"), "00"
    @equal tz(utc(1980, 0, 1, 0, 0, 59), "%S"), "59"
    done 3

  testNanoSeconds: (done) ->
    @equal tz(y2k, "%N"), "000000000"
    @equal tz(utc(1980, 0, 1, 0, 0, 1, 999), "%N"), "999000000"
    @equal tz(utc(1980, 0, 1, 0, 0, 1, 3), "%N"), "003000000"
    done 3

  testMeridiemTimeFormat: (done) ->
    @equal tz(moonwalk, "%r"), "02:36:00 AM"
    done 1

  testMilitaryTimeFormat: (done) ->
    @equal tz(moonwalk, "%R"), "02:36"
    done 1

  testMilitaryTimeFormatWithSeconds: (done) ->
    @equal tz(moonwalk, "%T"), "02:36:00"
    done 1

  testLocaleTimeFormat: (done) ->
    @equal tz(moonwalk, "%X"), "02:36:00"
    done 1

  testLocaleDateTimeFormat: (done) ->
    @equal tz(moonwalk, "%c"), "Mon Jul 21 02:36:00 1969"
    @equal tz(y2k, "%c"), "Sat Jan  1 00:00:00 2000"
    done 2
