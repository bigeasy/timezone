{spawn} = require "child_process"

name = process.argv[2] || "en_US"
output = process.argv[3] || "locale"
bash = spawn "bash"
bash.stdin.write """
locale=#{name}
days=()
for i in {1..7}
do
    days+=($(LANG=$locale.UTF-8 date -d '2006-01-0'$i +'%a'))
done
echo ${days[*]}

days=()
for i in {1..7}
do
    days+=($(LANG=$locale.UTF-8 date -d '2006-01-0'$i +'%A'))
done
echo ${days[*]}

months=()
for i in {1..12}
do
    number=$(printf '%02d' $i)
    months+=($(LANG=$locale.UTF-8 date -d '2000-'$number-'01' +'%b'))
done
echo ${months[*]}

months=()
for i in {1..12}
do
    number=$(printf '%02d' $i)
    months+=($(LANG=$locale.UTF-8 date -d '2000-'$number-'01' +'%B'))
done
echo ${months[*]}

LANG=$locale.UTF-8 date -d '2000-09-03 08:05:04' +'%p'
LANG=$locale.UTF-8 date -d '2000-09-03 23:05:04' +'%p'
LANG=$locale.UTF-8 date -d '2000-09-03 08:05:04' +'%P'
LANG=$locale.UTF-8 date -d '2000-09-03 23:05:04' +'%P'
LANG=$locale.UTF-8 date -d 2000-09-03 +'%x'
LANG=$locale.UTF-8 date -d 2000-09-03 +'%x'
LANG=$locale.UTF-8 date -d '2000-09-03 08:05:04' +'%X'
LANG=$locale.UTF-8 date -d '2000-09-03 23:05:04' +'%X'
LANG=$locale.UTF-8 date -d '2000-09-03 08:05:04'
LANG=$locale.UTF-8 date -d '2000-09-03 23:05:04'
"""
bash.stdin.end()
stdout = []
bash.stdout.on "data", (chunk) ->
  stdout.push chunk.toString "utf8"
bash.on "exit", (code) ->
  if code
    console.log { code }
    process.exit 1
  else
    stdout = stdout.join("").split(/\n/)
    if output is "locale"
      for line in stdout
        process.stdout.write "// #{line}\n"
      locale = { name, day: {}, month: {}, meridiem: [ {}, {} ] }
      locale.day.abbrev = stdout.shift().split(/\s+/)
      locale.day.full = stdout.shift().split(/\s+/)
      locale.month.abbrev = stdout.shift().split(/\s+/)
      locale.month.full = stdout.shift().split(/\s+/)
      [ am, pm ] = stdout.splice(0, 2)
      if am and pm
        locale.meridiem[0].upper = am
        locale.meridiem[1].upper = pm
      [ am, pm ] = stdout.splice(0, 2)
      if am and pm
        locale.meridiem[0].lower = am
        locale.meridiem[1].lower = pm
      [ am, pm ] = stdout.splice(0, 2)
      locale.dateFormat = createPattern locale, am, pm
      [ am, pm ] = stdout.splice(0, 2)
      locale.timeFormat = createPattern locale, am, pm
      [ am, pm ] = stdout.splice(0, 2)
      locale.dateTimeFormat = createPattern locale, am, pm
      process.stdout.write "module.exports = "
      process.stdout.write JSON.stringify locale, null, 2
      process.stdout.write ";\n"
    else
      shortDays = stdout.shift().split(/\s+/)
      days = stdout.shift().split(/\s+/)
      shortMonths = stdout.shift().split(/\s+/)
      months = stdout.shift().split(/\s+/)
      [ am, AM, pm, PM ] = stdout.splice(0, 4)
      [ dateFormat ] = stdout.splice(0, 2)
      [ morningTimeFormat, eveningTimeFormat ] = stdout.splice(0, 2)
      [ morningDateTimeFormat, eveningDateTimeFormat ] = stdout.splice(0, 2)
      process.stdout.write """
      class TestLocale extends TwerpTest
        "test: #{name} abbreviated days of week": (done) ->
          @equal tz("2006-01-01", "%a", "#{name}"), "#{shortDays[0]}"
          @equal tz("2006-01-02", "%a", "#{name}"), "#{shortDays[1]}"
          @equal tz("2006-01-03", "%a", "#{name}"), "#{shortDays[2]}"
          @equal tz("2006-01-04", "%a", "#{name}"), "#{shortDays[3]}"
          @equal tz("2006-01-05", "%a", "#{name}"), "#{shortDays[4]}"
          @equal tz("2006-01-06", "%a", "#{name}"), "#{shortDays[5]}"
          @equal tz("2006-01-07", "%a", "#{name}"), "#{shortDays[6]}"
          done 7

        "test: #{name} days of week": (done) ->
          @equal tz("2006-01-01", "%A", "#{name}"), "#{days[0]}"
          @equal tz("2006-01-02", "%A", "#{name}"), "#{days[1]}"
          @equal tz("2006-01-03", "%A", "#{name}"), "#{days[2]}"
          @equal tz("2006-01-04", "%A", "#{name}"), "#{days[3]}"
          @equal tz("2006-01-05", "%A", "#{name}"), "#{days[4]}"
          @equal tz("2006-01-06", "%A", "#{name}"), "#{days[5]}"
          @equal tz("2006-01-07", "%A", "#{name}"), "#{days[6]}"
          done 7

        "test: #{name} abbreviated months": (done) ->
          @equal tz("2000-01-01", "%b", "#{name}"), "#{shortMonths[0]}"
          @equal tz("2000-02-01", "%b", "#{name}"), "#{shortMonths[1]}"
          @equal tz("2000-03-01", "%b", "#{name}"), "#{shortMonths[2]}"
          @equal tz("2000-04-01", "%b", "#{name}"), "#{shortMonths[3]}"
          @equal tz("2000-05-01", "%b", "#{name}"), "#{shortMonths[4]}"
          @equal tz("2000-06-01", "%b", "#{name}"), "#{shortMonths[5]}"
          @equal tz("2000-07-01", "%b", "#{name}"), "#{shortMonths[6]}"
          @equal tz("2000-08-01", "%b", "#{name}"), "#{shortMonths[7]}"
          @equal tz("2000-09-01", "%b", "#{name}"), "#{shortMonths[8]}"
          @equal tz("2000-10-01", "%b", "#{name}"), "#{shortMonths[9]}"
          @equal tz("2000-11-01", "%b", "#{name}"), "#{shortMonths[10]}"
          @equal tz("2000-12-01", "%b", "#{name}"), "#{shortMonths[11]}"
          done 7

        "test: #{name} months": (done) ->
          @equal tz("2000-01-01", "%B", "#{name}"), "#{months[0]}"
          @equal tz("2000-02-01", "%B", "#{name}"), "#{months[1]}"
          @equal tz("2000-03-01", "%B", "#{name}"), "#{months[2]}"
          @equal tz("2000-04-01", "%B", "#{name}"), "#{months[3]}"
          @equal tz("2000-05-01", "%B", "#{name}"), "#{months[4]}"
          @equal tz("2000-06-01", "%B", "#{name}"), "#{months[5]}"
          @equal tz("2000-07-01", "%B", "#{name}"), "#{months[6]}"
          @equal tz("2000-08-01", "%B", "#{name}"), "#{months[7]}"
          @equal tz("2000-09-01", "%B", "#{name}"), "#{months[8]}"
          @equal tz("2000-10-01", "%B", "#{name}"), "#{months[9]}"
          @equal tz("2000-11-01", "%B", "#{name}"), "#{months[10]}"
          @equal tz("2000-12-01", "%B", "#{name}"), "#{months[11]}"
          done 7

        "test: #{name} date representation": (done) ->
          @equal tz("2000-09-03", "%x", "#{name}"), "#{dateFormat}"
          done 1

        "test: #{name} time representation": (done) ->
          @equal tz("2000-09-03 08:05:04", "%X", "#{name}"), "#{morningTimeFormat}"
          @equal tz("2000-09-03 23:05:04", "%X", "#{name}"), "#{eveningTimeFormat}"
          done 2

        "test: #{name} date time representation": (done) ->
          @equal tz("2000-09-03 08:05:04", "%c", "#{name}"), "#{morningDateTimeFormat}"
          @equal tz("2000-09-03 23:05:04", "%c", "#{name}"), "#{eveningDateTimeFormat}"
          done 2

      """

createPattern = (locale, am, pm) ->
  am = am.replace("04", "%S")
  am = am.replace("05", "%M")
  clock = if /11/.test pm then "i" else "k"
  am = am.replace("08", "%#{clock}")
  am = am.replace("8", "%-#{clock}")
  am = am.replace("03", "%d")
  am = am.replace("3", "%-d")
  am = am.replace("09", "%m")
  am = am.replace("9", "%-m")
  am = am.replace("2000", "%Y")
  am = am.replace("00", "%y")
  am = am.replace(locale.meridiem[0].upper, "%p")
  am = am.replace(locale.meridiem[0].lower, "%P")
  am = am.replace(locale.day.abbrev[0], "%a")
  am = am.replace(locale.day.full[0], "%A")
  am = am.replace(locale.month.abbrev[8], "%b")
  am = am.replace(locale.month.full[8], "%B")
  am = am.replace(/\s+/g, " ")
  am
