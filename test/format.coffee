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

  testWeekOfYearStartingSunday: (done) ->
    lines = fs.readFileSync("#{__dirname}/data/format/U", "utf8").split(/\n/)
    lines.pop()
    for line in lines
      [date, dayOfYear] = line.split /\s+/
      @equal tz("%U", readDate(date)), dayOfYear
    done lines.length

  testWeekOfYearStartingMonday: (done) ->
    lines = fs.readFileSync("#{__dirname}/data/format/W", "utf8").split(/\n/)
    lines.pop()
    for line in lines
      [date, dayOfYear] = line.split /\s+/
      @equal tz("%W", readDate(date)), dayOfYear
    done lines.length

  testISOWeekNumber: (done) ->
    lines = fs.readFileSync("#{__dirname}/data/format/V", "utf8").split(/\n/)
    lines.pop()
    for line in lines
      [date, dayOfYear] = line.split /\s+/
      @equal tz("%V", readDate(date)), dayOfYear
    done lines.length

  testISOWeekShortYear: (done) ->
    lines = fs.readFileSync("#{__dirname}/data/format/G", "utf8").split(/\n/)
    lines.pop()
    for line in lines
      [date, dayOfYear] = line.split /\s+/
      @equal tz("%G", readDate(date)), dayOfYear
    done lines.length

  testISOWeekLongYear: (done) ->
    lines = fs.readFileSync("#{__dirname}/data/format/_g", "utf8").split(/\n/)
    lines.pop()
    for line in lines
      [date, dayOfYear] = line.split /\s+/
      @equal tz("%g", readDate(date)), dayOfYear
    done lines.length

  testMonth: (done) ->
    @equal tz("%m", moonwalk), "07"
    @equal tz("%m", y2k), "01"
    done 2

  testShortMonth: (done) ->
    @equal tz("%h", moonwalk), "Jul"
    @equal tz("%b", moonwalk), "Jul"
    @equal tz("%b", utc(1980, 0, 1)), "Jan"
    @equal tz("%b", utc(1980, 1, 1)), "Feb"
    @equal tz("%b", utc(1980, 2, 1)), "Mar"
    @equal tz("%b", utc(1980, 3, 1)), "Apr"
    @equal tz("%b", utc(1980, 4, 1)), "May"
    @equal tz("%b", utc(1980, 5, 1)), "Jun"
    @equal tz("%b", utc(1980, 6, 1)), "Jul"
    @equal tz("%b", utc(1980, 7, 1)), "Aug"
    @equal tz("%b", utc(1980, 8, 1)), "Sep"
    @equal tz("%b", utc(1980, 9, 1)), "Oct"
    @equal tz("%b", utc(1980, 10, 1)), "Nov"
    @equal tz("%b", utc(1980, 11, 1)), "Dec"
    done 14

  testLongMonth: (done) ->
    @equal tz("%B", moonwalk), "July"
    @equal tz("%B", utc(1980, 0, 1)), "January"
    @equal tz("%B", utc(1980, 1, 1)), "February"
    @equal tz("%B", utc(1980, 2, 1)), "March"
    @equal tz("%B", utc(1980, 3, 1)), "April"
    @equal tz("%B", utc(1980, 4, 1)), "May"
    @equal tz("%B", utc(1980, 5, 1)), "June"
    @equal tz("%B", utc(1980, 6, 1)), "July"
    @equal tz("%B", utc(1980, 7, 1)), "August"
    @equal tz("%B", utc(1980, 8, 1)), "September"
    @equal tz("%B", utc(1980, 9, 1)), "October"
    @equal tz("%B", utc(1980, 10, 1)), "November"
    @equal tz("%B", utc(1980, 11, 1)), "December"
    done 13

  testShortYear: (done) ->
    @equal tz("%y", y2k), "00"
    @equal tz("%y", bicentenial), "76"
    done 2

  testLongYear: (done) ->
    @equal tz("%Y", y2k), "2000"
    @equal tz("%Y", bicentenial), "1976"
    done 2

  testCentury: (done) ->
    @equal tz("%C", bicentenial), "19"
    done 1

  testShortFormat: (done) ->
    @equal tz("%D", bicentenial), "07/04/76"
    done 1

  testLocaleFormat: (done) ->
    @equal tz("%x", bicentenial), "07/04/76"
    done 1

  testLongFormat: (done) ->
    @equal tz("%F", bicentenial), "1976-07-04"
    done 1

  testDialHours: (done) ->
    @equal tz("%l", utc(2011, 0, 1, 0)), "12"
    @equal tz("%l", utc(2011, 0, 1, 1)), "1"
    @equal tz("%l", utc(2011, 0, 1, 12)), "12"
    @equal tz("%l", utc(2011, 0, 1, 13)), "1"
    done 4

  testDialHoursPadded: (done) ->
    @equal tz("%I", utc(2011, 0, 1, 0)), "12"
    @equal tz("%I", utc(2011, 0, 1, 1)), "01"
    @equal tz("%I", utc(2011, 0, 1, 12)), "12"
    @equal tz("%I", utc(2011, 0, 1, 13)), "01"
    done 4

  testMilitaryHours: (done) ->
    @equal tz("%k", utc(2011, 0, 1, 0)), " 0"
    @equal tz("%k", utc(2011, 0, 1, 1)), " 1"
    @equal tz("%k", utc(2011, 0, 1, 12)), "12"
    @equal tz("%k", utc(2011, 0, 1, 13)), "13"
    done 4

  testMilitaryHoursPadded: (done) ->
    @equal tz("%H", utc(2011, 0, 1, 0)), "00"
    @equal tz("%H", utc(2011, 0, 1, 1)), "01"
    @equal tz("%H", utc(2011, 0, 1, 12)), "12"
    @equal tz("%H", utc(2011, 0, 1, 13)), "13"
    done 4

  testMeridiem: (done) ->
    @equal tz("%P", utc(2011, 0, 1, 0)), "am"
    @equal tz("%P", utc(2011, 0, 1, 1)), "am"
    @equal tz("%P", utc(2011, 0, 1, 12)), "pm"
    @equal tz("%P", utc(2011, 0, 1, 13)), "pm"
    done 4

  testUppercaseMeridiem: (done) ->
    @equal tz("%p", utc(2011, 0, 1, 0)), "AM"
    @equal tz("%p", utc(2011, 0, 1, 1)), "AM"
    @equal tz("%p", utc(2011, 0, 1, 12)), "PM"
    @equal tz("%p", utc(2011, 0, 1, 13)), "PM"
    done 4

  testMinutes: (done) ->
    @equal tz("%M", utc(2011, 0, 1, 0, 0)), "00"
    @equal tz("%M", utc(2011, 0, 1, 0, 1)), "01"
    @equal tz("%M", utc(2011, 0, 1, 0, 59)), "59"
    done 3

  testEpochSeconds: (done) ->
    @equal tz("%s", utc(1970, 0, 4, 5, 0, 1)), "277201"
    @equal tz("%s", moonwalk), "-14160240"
    @equal tz("%s", y2k), "946684800"
    done 3

  testSeconds: (done) ->
    @equal tz("%S", utc(1980, 0, 1, 0, 0, 1)), "01"
    @equal tz("%S", moonwalk), "00"
    @equal tz("%S", utc(1980, 0, 1, 0, 0, 59)), "59"
    done 3

  testNanoSeconds: (done) ->
    @equal tz("%N", y2k), "000000000"
    @equal tz("%N", utc(1980, 0, 1, 0, 0, 1, 999)), "999000000"
    @equal tz("%N", utc(1980, 0, 1, 0, 0, 1, 3)), "003000000"
    done 3

  testMeridiemTimeFormat: (done) ->
    @equal tz("%r", moonwalk), "02:36:00 AM"
    done 1

  testMilitaryTimeFormat: (done) ->
    @equal tz("%R", moonwalk), "02:36"
    done 1

  testMilitaryTimeFormatWithSeconds: (done) ->
    @equal tz("%T", moonwalk), "02:36:00"
    done 1

  testLocaleTimeFormat: (done) ->
    @equal tz("%X", moonwalk), "02:36:00"
    done 1
