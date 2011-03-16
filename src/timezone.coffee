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

  MINUTE  = 1000 * 60
  HOUR    = MINUTE * 60
  DAY     = HOUR * 24

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

  weekOfYear = (date, startOfWeek) ->
    utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    nyd = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
    diff = (utc.getTime() - nyd.getTime()) / DAY
    day = utc.getUTCDay()
    if nyd.getUTCDay() is startOfWeek
      weekStart = 0
    else
      weekStart = 7 - nyd.getUTCDay() + startOfWeek
      weekStart = 1 if weekStart is 8
    remaining = diff - weekStart
    week = 0
    if diff >= weekStart
      week++
      diff -= weekStart
      week += Math.floor(diff / 7)
    week

  isoWeek = (date) ->
    nyd = new Date(Date.UTC(date.getUTCFullYear(), 0, 1)).getUTCDay()
    offset = if nyd > 1 and nyd <= 4 then 1 else 0
    week = weekOfYear(date, 1) + offset
    if week is 0
      ny = new Date(Date.UTC(date.getUTCFullYear() - 1, 0, 1))
      nyd = ny.getUTCDay()
      week = if nyd is 4 or (nyd is 3 and isLeapYear(ny)) then 53 else 52
      [ week, date.getUTCFullYear() - 1 ]
    else if week is 53 and not (nyd is 4 or (nyd is 3 and isLeapYear(date)))
      [ 1, date.getUTCFullYear() + 1 ]
    else
      [ week, date.getUTCFullYear() ]

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
    U: (date) -> weekOfYear(date, 0)
    W: (date) -> weekOfYear(date, 1)
    V: (date) -> iso = isoWeek(date)[0]
    G: (date) -> iso = isoWeek(date)[1]
    g: (date) -> iso = isoWeek(date)[1] % 100
    m: (date) -> date.getMonth() + 1
    h: (date, locale) -> locale.month.abbrev[date.getMonth()]
    b: (date, locale) -> locale.month.abbrev[date.getMonth()]
    B: (date, locale) -> locale.month.full[date.getMonth()]
    y: (date) -> date.getFullYear() % 100
    Y: (date) -> date.getFullYear()
    c: (date) -> Math.floor(date.getFullYear() / 100) / 100

  padding =
    d: 2
    U: 2
    W: 2
    V: 2
    g: 2
    m: 2
    j: 3

  paddings = { "-": (number) -> number }
  for flag, ch of { "_": " ", "0": "0" }
    paddings[flag] = do (ch) ->
      (number, padding) -> pad(number, padding, ch)

  transforms =
    none: (value) -> value
    "^": (value) -> value.toUpperCase()

  format = (format, date, zone, locale) ->
    locale or= locales.en_US
    offset = date
    output = []
    while format.length
      match = /^(.*?)%([-0_^]?)([aAdejuwUWVmhbByYcGg])(.*)$/.exec(format)
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

  isDate = (object) ->

  parse = (pattern) ->

  exports.tz = exports.timezone = (splat...) ->
    return null unless splat.length and splat[0]?
    if splat[0].getTimezoneOffset and splat[0].setUTCFullYear
      offset.apply null, splat
    else if splat[0].charCodeAt and splat[0].substring
      if splat.length is 1
        parse.apply null, splat
      else
        format.apply null, splat
)(if module? and module.exports? then module.exports else this.timezone = {})
