fs = require "fs"

MONTH = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split /\s+/
DAY = "Sun Mon Tue Wed Thu Fri Sat".split /\s+/

MINUTE = 60 * 1000
HOUR = MINUTE * 60

parseOffset = (pattern) ->
  offset = 0

  match = /^(-?)(\d+)(?::(\d+))?(?::(\d+))?$/.exec(pattern)
  throw new Error "pattern: #{pattern}" if (! match)
  match = match.slice(1, 5)
  match[0] += '1'

  milliseconds = [ HOUR, MINUTE, 1000 ]
  for i in [1...match.length]
    offset += parseInt(match[i] || '0', 10) * milliseconds[i - 1]

  offset *= parseInt(match[0])

  offset

getDate = (month, day) ->
  if match = /^last(.*)$/.exec(day)
    [ date, day, last ] = [ month, DAY.indexOf(match[1]) ]
    while date.getUTCMonth() is month.getUTCMonth()
      if date.getUTCDay() is day
        last = date
      date = new Date(date.getTime() + 24 * HOUR)
    last
  else if match = /^first(.*)$/.exec(day)
    getDate year, month, "#{match[1]}>=1}"
  else if match = /^(\w+)>=(\d+)$/.exec(day)
    [ date, day, least ] = [ month, DAY.indexOf(match[1]), parseInt(match[2], 10) ]
    while date.getUTCDate() < least
      date.setUTCDate(date.getUTCDate() + 1)
    while date.getUTCDay() isnt day
      date.setUTCDate(date.getUTCDate() + 1)
    date
  else
    month.setUTCDate(parseInt(day, 10))
    month

# The files look tab delimited, but they are not.
for file in process.argv.slice 2
  info = { rules: {},  zones: {} }
  base = file.replace /^.*\/(.*)$/, "$1"
  name = null
  for line in fs.readFileSync(file, "utf8").split /\n/
    line = line.trim()
    continue if line is "" or /^\s*#/.test(line)
    line = line.replace /\s*#.*$/, ""
    record = line.split /\s+/
    switch record[0]
      when "Rule"
        [ name, from, to, type, month, day, time, save, letter ] = record.slice(1)
        if type isnt "-"
          console.log type
        info.rules[name] or= []
        info.rules[name].push {
          from: parseInt(from, 10)
          to: switch to
            when "only"
              parseInt(from, 10)
            when "max"
              Number.MAX_VALUE
            else
              parseInt(to, 10)
          type
          month: MONTH.indexOf(month)
          day
          time: if time == "0" then "0:00" else time
          save
          letter: if letter is "-" then "" else letter
        }
      when "Link"
      else
        if record[0] is "Zone"
          name = record[1]
          info.zones[name] = []
          record = record.slice 2
        info.zones[name].push {
          offset: parseOffset(record[0]) / 1000
          rules: record[1]
          format: record[2]
          until: record.slice(3)
        }

  for name, zone of info.zones
    zone.reverse()
    for record in zone
      record.clock = "wallclock"
      if record.rules is "-"
        record.rules = false
      if record.until.length
        date = new Date(Date.UTC(parseInt(record.until.shift(), 10), MONTH.indexOf(record.until.shift() or "Jan")))
        if record.until.length
          date = getDate(date, record.until.shift())
          if record.until.length
            [ hour, minute, second, type ] = /^(\d+):(\d+)(?::(\d+))?(s|w|g|u|z)?$/.exec(record.until.shift()).slice(1)
            date.setUTCHours(parseInt(hour, 10))
            date.setUTCMinutes(parseInt(minute, 10))
            if second?
              date.setUTCSeconds(parseInt(minute, 10))
            record.clock = switch type
              when "s" then "standard"
              when "g", "u", "z" then "posix"
              else "wallclock"
        record.until = date.getTime() / 1000
      else
        record.until = false

  process.stdout.write "module.exports = "
  process.stdout.write JSON.stringify(info, null, 2)
  process.stdout.write "\n"
