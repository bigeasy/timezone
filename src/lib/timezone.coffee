# Some local times do not exist, like when clocks are set forward for daylight
# savings time.

# Wrap everything in a function and pass in an exports map appropriate for node
# or the browser, depending on where we are.
exports or= window
do (exports) ->
  TIMEZONES = { zones: {}, rules: {} }
  LOCALES =
    en_US:
      day:
        abbrev: "Sun Mon Tue Wed Thu Fri Sat".split /\s/
        full: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split /\s/
      month:
        abbrev: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split /\s/
        full: "January February March April May June July August September October November December".split /\s/
      dateFormat: "%m/%d/%y"
      timeFormat: "%H:%M:%S"
      dateTimeFormat: "%a %b %_d %H:%M:%S %Y"
      meridiem: [ "am", "pm" ]

  SECOND  = 1000
  MINUTE  = SECOND * 60
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

  dialHours = (date) ->
    hours = Math.floor(date.getUTCHours() % 12)
    if hours is 0 then 12 else hours

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
    m: (date) -> date.getUTCMonth() + 1
    h: (date, locale) -> locale.month.abbrev[date.getUTCMonth()]
    b: (date, locale) -> locale.month.abbrev[date.getUTCMonth()]
    B: (date, locale) -> locale.month.full[date.getUTCMonth()]
    y: (date) -> date.getUTCFullYear() % 100
    Y: (date) -> date.getUTCFullYear()
    C: (date) -> Math.floor(date.getFullYear() / 100)
    D: (date) -> tz(date, "%m/%d/%y")
    x: (date, locale) -> tz(locale.dateFormat, date, locale)
    F: (date) -> tz(date, "%Y-%m-%d")
    l: (date) -> dialHours(date)
    I: (date) -> dialHours(date)
    k: (date) -> date.getUTCHours()
    H: (date) -> date.getUTCHours()
    P: (date, locale) -> locale.meridiem[Math.floor(date.getUTCHours() / 12)]
    p: (date, locale) -> locale.meridiem[Math.floor(date.getUTCHours() / 12)].toUpperCase()
    M: (date) -> date.getUTCMinutes()
    s: (date) -> Math.floor(date.getTime() / 1000) # Affeced by TZ in unix date.
    S: (date) -> date.getUTCSeconds()
    N: (date) -> (date.getTime() % 1000) * 1000000
    r: (date) -> tz(date, "%I:%M:%S %p")
    R: (date) -> tz(date, "%H:%M")
    T: (date) -> tz(date, "%H:%M:%S")
    X: (date, locale) -> tz(date, locale.timeFormat, locale)
    c: (date, locale) -> tz(date, locale.dateTimeFormat, locale)
    z: (date, locale, tzdata) ->
      offset = Math.floor(offsetInMilliseconds(tzdata.offset) / 1000 / 60)
      if offset < 0
        "-#{pad Math.abs(offset), 4, "0"}"
      else
        pad Math.abs(offset), 4, "0"

  padding =
    d: 2
    U: 2
    W: 2
    V: 2
    g: 2
    m: 2
    j: 3
    C: 2
    I: 2
    H: 2
    k: 2
    M: 2
    S: 2
    N: 9
    y: 2

  paddings = { "-": (number) -> number }
  for flag, ch of { "_": " ", "0": "0" }
    paddings[flag] = do (ch) ->
      (number, padding) -> pad(number, padding, ch)

  transforms =
    none: (value) -> value
    "^": (value) -> value.toUpperCase()

  # Probably should transpose.
  toString = (date, request) ->
    { format, locale, zone } = request
    [ offset, output ] = [ new Date(date), [] ]
    tzdata = TIMEZONES.zones[zone]
    offset = wallclock(offset, tzdata) if zone isnt "UTC"
    while format.length
      match = /^(.*?)%([-0_^]?)([aAcdDeFHIjklMNpPsrRSTuwXUWVmhbByYcGgCx])(.*)$/.exec(format)
      if match
        [ prefix, flags, specifier, rest ] = match.slice(1)
        value = specifiers[specifier](offset, locale)
        if padding[specifier]
          flag = if specifier is "k" then "_" else "0"
          for i in [0...flags.length]
            flag = flags[i] if paddings[flags[i]]
          value = paddings[flag](value, padding[specifier], tzdata)
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

  offsetInMilliseconds = (pattern) ->
    match = /^(-?)(\d)+:(\d)+(?::(\d+))?$/.exec(pattern).slice(1)
    sign = match.shift()
    [ hours, minutes, seconds ] = match.map (number) -> parseInt number, 10
    offset = hours * HOUR
    offset += minutes * MINUTE
    offset += (seconds or 0) * SECOND
    offset *= -1 if sign is '-'
    offset

  compare: (left, right, fields...) ->
    for field in fields
      field = field.replace /^./, (m) -> "getUTC#{m.toUpperCase()}"
      difference = left[field]() - right[field]()
      return difference if not difference

  wallclock = (date, tzdata) ->
    time = date.getTime()
    for i in [(tzdata.length - 1)..0]
      candidate = tzdata[i]
      adjustment = time + offsetInMilliseconds(candidate.offset)
      if candidate.until
        parsed = new Date(candidate.until)
        if parsed.getTime() < adjustment
          break
      adjusted = adjustment
    new Date(adjusted)

  # The all purpose exported function.
  exports.tz = tz = (date, splat...) ->
    # Assert that we've been given a date.
    throw new Error "invalid arguments" if not date?

    # Create a default request.
    request = { zone: "UTC", adjustments: [] }

    # Arguments with a `%` are date formats. Arguments that match a timezone are
    # timezones, while arguments that look like locales are locales. If nothing
    # matches, we assume that it is date math.
    for argument in splat
      argument = String(argument)
      if argument.indexOf("%") != -1
        request.format or= argument
      else if TIMEZONES.zones[argument]
        request.zone = argument
      else if /^\w{2}_\w{2}$/.test argument
        request.locale or= LOCALES[argument]
        throw new Error "unknown locale" if not request.locale
      else
        request.adjustments.push argument

    # America No. 1! U-S-A! U-S-A!
    request.locale or= LOCALES.en_US

    # Convert the date argument to seconds since the epoch.
    if date.getTime
      date = date.getTime()
    else if typeof date is "string"
      date = parse date, request

    # Apply date math if any.
    for adjustment in request.adjustments
      date = adjust adjustment, request

    # Apply format if any.
    if request.format
      toString date, request
    else
      date

  tz.locales = (override) ->
    if override?
      for k, v of override
        LOCALES[k] = v
    LOCALES

  tz.timezones = (override) ->
    if override?
      for k, v of override?.zones
        TIMEZONES.zones[k] = v
      for k, v of override?.rules
        TIMEZONES.rules[k] = v
    TIMEZONES
