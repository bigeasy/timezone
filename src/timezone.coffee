# Some local times do not exist, like when clocks are set forward for daylight
# savings time.

# Wrap everything in a function and pass in an exports map appropriate for node
# or the browser, depending on where we are.
((exports) ->
  locales =
    en_US:
      day:
        abbrev: "Sun Mon Tue Wed Thu Fri Sat".split /\s/
        full: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split /\s/
      month:
        abbrev: "Jan Feb Mar Apr Jun Jul Aug Sep Oct Nov Dec".split /\s/
        full: "January February March April June July August September October Novomber December".split /\s/

  pad = (number, padding, char) ->
    string = String(number)
    "#{new Array((padding - string.length) + 1).join(char)}#{string}"

  monthDayOfYear = [ 1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ]

  isLeapYear = (date) ->
    year = date.getUTCFullYear()
    if year % 400 is 0
      true
    else if year % 100 is 0
      false
    else if year % 4 is 0
      true
    else
      false

  # Map the specifiers to a function that implements the specifier.
  specifiers =
    a: (date, locale) -> locale.day.abbrev[date.getUTCDay()]
    A: (date, locale) -> locale.day.full[date.getUTCDay()]
    d: (date) -> date.getUTCDate()
    e: (date) -> date.getUTCDate()
    j: (date) ->
      month = date.getUTCMonth()
      days = monthDayOfYear[month]
      if month > 2 and isLeapYear(date)
        days++
      days += date.getUTCDate() - 1
      days
    u: (date) ->
      day = date.getUTCDay()
      day = 7 if day is 0
      day
    w: (date) -> date.getUTCDay()
    U: (date) ->
      utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      nyd = new Date(Date.UTC(date.getFullYear(), 0, 1))
      weekStart = 6 - utc.getDay()
      weekStart = 7 if weekStart < 0
      diff = (utc.getTime() - nyd.getTime()) / DAY
      remaining = diff - weekStart
      week = 0
      if diff > weekStart
        week++
        diff -= weekStart
        week += Math.floor((diff + 7 - 1) / 7 * 7)
      week
    m: (date) -> date.getMonth() + 1
    h: (date, locale) -> locale.month.abbrev[date.getMonth()]
    b: (date, locale) -> locale.month.abbrev[date.getMonth()]
    B: (date, locale) -> locale.month.full[date.getMonth()]
    y: (date) -> date.getFullYear() % 100
    Y: (date) -> date.getFullYear()
    c: (date) -> Math.floor(date.getFullYear() / 100) / 100

  padding =
    d: 2
    m: 2
    j: 3

  paddings = { "-": (number) -> number }
  for flag, ch of { "_": " ", "0": "0" }
    paddings[flag] = do (ch) ->
      (number, padding) -> pad(number, padding, ch)

  transforms =
    none: (value) -> value
    "^": (value) -> value.toUpperCase()

  exports.format = format = (date, format, zone, locale) ->
    locale or= locales.en_US
    offset = date
    output = []
    while format.length
      match = /^(.*?)%([-0_^]?)([aAdejuwUmhbByYc])(.*)$/.exec(format)
      if match
        [ prefix, flags, specifier, rest ] = match.slice(1)
        value = specifiers[specifier](offset, locale)
        if padding[specifier]
          flag = "0"
          for i in [0...flags.length]
            flag = flags[i] if paddings[flags[i]]
          value = paddings[flag](value, padding[specifier])
        transform = transforms.none
        for i in [0..flags.length]
          transform = transforms[flags[i]] or transform
        value = transform(value)
        output.push prefix if prefix?
        output.push value
        format = rest
      else if format.length
        output.push format
        format = ""
    output.join ""
)(if module? and module.exports? then module.exports else this.timezone = {})
