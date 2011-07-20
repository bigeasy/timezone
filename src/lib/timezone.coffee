# Some local times do not exist, like when clocks are set forward for daylight
# savings time.

# Wrap everything in a function and pass in an exports map appropriate for node
# or the browser, depending on where we are.
do -> (exports or= window) and do (exports) ->
  TIMEZONES = { zones: {}, rules: {} }

  LOCALES =
    en_US:
      name: "en_US"
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

  daysInMonth = do ->
    DAYS_IN_MONTH = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

    (month, year)->
      days = DAYS_IN_MONTH[month]
      days++ if month is 1 and isLeapYear year
      days

  isLeapYear = (year) ->
    if year % 400 is 0
      true
    else if year % 100 is 0
      false
    else if year % 4 is 0
      true
    else
      false

  # Probably should transpose.
  format = do ->
    MONTH_DAY_OF_YEAR = [ 1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ]

    weekOfYear = (date, startOfWeek) ->
      date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
      nyd = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
      diff = (date.getTime() - nyd.getTime()) / DAY
      day = date.getUTCDay()
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
      nyy = date.getUTCFullYear()
      nyd = new Date(Date.UTC(nyy, 0, 1)).getUTCDay()
      offset = if nyd > 1 and nyd <= 4 then 1 else 0
      week = weekOfYear(date, 1) + offset
      if week is 0
        ny = new Date(Date.UTC(date.getUTCFullYear() - 1, 0, 1))
        nyd = ny.getUTCDay()
        nyy = ny.getUTCFullYear()
        week = if nyd is 4 or (nyd is 3 and isLeapYear(nyy)) then 53 else 52
        [ week, date.getUTCFullYear() - 1 ]
      else if week is 53 and not (nyd is 4 or (nyd is 3 and isLeapYear(nyy)))
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
        days = MONTH_DAY_OF_YEAR[month]
        if month > 2 and isLeapYear(date.getUTCFullYear())
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
      x: (date, locale, tzdata) -> tz(date, locale.dateFormat, locale.name, tzdata.name)
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
      X: (date, locale, tzdata) -> tz(date, locale.timeFormat, locale.name, tzdata.name)
      c: (date, locale, tzdata) -> tz(utc(date.getTime(), tzdata), locale.dateTimeFormat, locale.name, tzdata.name)
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

    pad = (number, padding, char) ->
      string = String(number)
      "#{new Array((padding - string.length) + 1).join(char)}#{string}"

    transforms =
      none: (value) -> value
      "^": (value) -> value.toUpperCase()

    (epoch, request) ->
      offset  = new Date(epoch)
      output  = []
      tzdata  = TIMEZONES.zones[request.zone]
      locale  = LOCALES[request.locale]
      rest    = request.format
      while rest.length
        match = ///
          ^
          (.*?)
          %
          ([-0_^]?)
          ([aAcdDeFHIjklMNpPsrRSTuwXUWVmhbByYcGgCx])
          (.*)
          $
        ///.exec rest
        if match
          [ prefix, flags, specifier, rest ] = match.slice(1)
          value = specifiers[specifier](offset, locale, tzdata)
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
        else if rest.length
          output.push rest
          rest = ""
      output.join ""

  # Create a date, filling in the blanks.
  makeDate = (year, month, day, hours, minutes, seconds, milliseconds) ->
    date = []

    if not year?
      now = new Date()
      date.push now.getUTCFullYear()
    else
      date.push parseInt year, 10

    if not month?
      if not year?
        date.push now.getUTCMonth()
      else
        date.push 0
    else
      date.push parseInt(month, 10) - 1

    if not day?
      if not year?
        date.push now.getUTCDate()
      else
        date.push 1
    else
      date.push parseInt day, 10

    if not hours?
      date.push 0
    else
      date.push parseInt hours, 10

    if not minutes?
      date.push 0
    else
      date.push parseInt minutes, 10

    if not seconds?
      date.push 0
    else
      date.push parseInt seconds, 10

    if not milliseconds?
      date.push 0
    else
      date.push parseInt milliseconds, 10

    Date.UTC.apply null, date

  # Parse a pattern, possibly fuzzy.
  parse = (pattern) ->
    # Best foot forward, an ISO date. An ISO date can also be YYYY, but we catch
    # that case later on, so we don't pluck YYYY/MM or some such now.
    if match = ///
      ^             # start
      (.*?)         # before
      (?:           # year 
        (\d\d\d\d)    # four digit year
          -           # hyphen
        (\d\d)        # two digit month
        (?:           # optional date
            -           # hypen
          (\d{2})       # two digit date
        )?
      |             # year with no hyphens
        (\d{4})       # year
        (\d{2})       # month
        (\d{2})?      # date
      )
      (?:           # optional time
        (?:\s+|T)     # time delimiter
        (\d\d)        # hours
        (?:           # optional minutes
          :?            # optional colon
          (\d\d)        # minutes 
          (?:           # optional seconds
            :?            # optional colon
            (\d\d)        # seconds
            (?:           # optional milliseconds
              \.            # period
              (\d+)         # milliseconds
            )?
          )?
        )?
      )?
      (?:           # optional zone 
        (?:\s+|Z)     # zone delimiter
        (?:
          ([+-])      # sign
          (\d{2})     # hours
          (?:         # optional minutes
            :?          # optional colon
            (\d{2})     # minutes
          )?
        )
      )?
      (.*)          # after
      $
    ///.exec(pattern)
      before = match.splice(0, 2).pop()
      
      date = match.splice(0, 3)
      [ year, month, day ] = date if date[0]?

      date = match.splice(0, 3)
      [ year, month, day ] = date if date[0]?

      time = match.splice(0, 4)
      [ hours, minutes, seconds, milliseconds ] = time if time[0]?

      zone = match.splice(0, 3)
      [ sign, zoneHours, zoneMinutes ] = zone if zone[0]?

      after = match.pop()

      remaining = (before + after).replace(/\s+/, "").length
      if remaining is 0
        return makeDate year, month, day, hours, minutes, seconds, milliseconds

    # Parse a UNIX date, another common construct. No need to be fuzzy about
    # this at all. There is only really one valid format.
   
    # Try to find something date like, interpret using locale.
   
      # Take the locale preference for month/day ordering.

      # If it doesn't fit, try the other way.

      # If that doesn't fit, see if you can find a date in the remaining bit.

    # Look for a time, either in the whole pattern, or in what's left after the
    # date consumed a date-like thing.

    # Now let's split what we've got and look for locale specific words that are
    # meaningful.

    # If we're willing to be fuzzy, then we'll look harder. Maybe we have a
    # bunch of regular expressions to run, that will extract locale specific
    # strings, say, this looks like an hour, this looks like a day of the week,
    # this looks like a date. So /at (\d+)\s*([pa]m?)/i or some such, with ()
    # for place holders for bits of the pattern that won't match.

    # Let's start by parsing ISO, UNIX and not very fuzzy dates. Really, you can
    # just tell the user to try harder, or else prompt with a date format.

  offsetInMilliseconds = (pattern) ->
    match = /^(-?)(\d)+:(\d)+(?::(\d+))?$/.exec(pattern).slice(1)
    sign = match.shift()
    [ hours, minutes, seconds ] = match.map (number) -> parseInt number, 10
    offset = hours * HOUR
    offset += minutes * MINUTE
    offset += (seconds or 0) * SECOND
    offset *= -1 if sign is '-'
    offset

  ruleToDate = (year, rule) ->
    match = /^(\d)+:(\d)+(?::(\d+))?$/.exec(rule.time).slice(1)
    [ hours, minutes, seconds ] = (parseInt number or 0, 10 for number in match)
    match = /^(?:(\d+)|(?:last)?(\w+)|(\w+)>=(\d+))$/.exec(rule.day)
    if match[1]
      date = new Date(Date.UTC(year, rule.month, parseInt(match[1], 10), hours, minutes, seconds))
    else if match[2]
      for day, i in LOCALES.en_US.day.abbrev
        if day is match[2]
          index = i
          break
      day = daysInMonth(rule.month, year)
      loop
        date = new Date(Date.UTC(year, rule.month, day, hours, minutes, seconds))
        if date.getDay() is index
          break
        day--
    else
      min = parseInt match[4], 10
      for day, i in LOCALES.en_US.day.abbrev
        if day is match[3]
          index = i
          break
      day = 1
      loop
        date = new Date(Date.UTC(year, rule.month, day, hours, minutes, seconds))
        if date.getDay() is index and date.getDate() >= min
          break
        day++
    date.getTime()

  # Parse until. We store until as a string in the JSON zone files so they are
  # easy to read. If IE 6 supports parsing ISO date stamps, we can use `new
  # Date(zone.until)` instead of the regex.
  convertUntil = (zone) ->
    if typeof zone.until isnt "number"
      if zone.until?
        fields = (parseInt(field, 10) for field in ///
          ^
          (\d{4})-(\d{2})-(\d{2})
          T
          (\d{2}):(\d{2}):(\d{2})
          .000Z
          $
        ///.exec(zone.until).slice(1))
        fields[1]--
        zone.until = Date.UTC.apply null, fields
      else
        zone.until = Math.MAX_VALUE
    zone.until
      

  # Convert the UTC epoch seconds to epoch seconds in the given time zone.
  wallclock = (epoch, tzdata) ->
    for maybe in tzdata
      offset = epoch + offsetInMilliseconds(maybe.offset)
      break if convertUntil(maybe) < offset
      zone = maybe
      wall = offset

      # Now we have an adjusted time. We're going to pretend that seconds since
      # the epoch starts from 1/1/1970 in the current timezone, instead of in
      # UTC. We're going to use our date a structure for the field names, and
      # treat UTC values as if the were local time. This means we can do simple
      # compares between seconds since the epoch, but this is our little secret.
      #
      # FIXME We use this three times. DRY it up.
      if rules = TIMEZONES.rules[zone.rules]
        year = new Date(wall).getUTCFullYear()
        previous = new Date(year - 1, 0, 1).getTime()
        for rule in rules
          if rule.from <= year and year <= rule.to
            start = ruleToDate(year, rule)
            if start <= wall and previous < start
              previous = start
              dst = rule

    if dst and dst.save isnt '0'
      wall += offsetInMilliseconds(dst.save)

    wall

  utc = (epoch, tzdata) ->
    for maybe in tzdata
      break if convertUntil(maybe) < epoch
      zone = maybe

      if rules = TIMEZONES.rules[zone.rules]
        year = new Date(epoch).getUTCFullYear()
        previous = new Date(year - 1, 0, 1).getTime()
        for rule in rules
          if rule.from <= year and year <= rule.to
            start = ruleToDate(year, rule)
            if start <= epoch and previous < start
              previous = start
              dst = rule

    epoch -= offsetInMilliseconds(zone.offset)

    if dst and dst.save isnt '0'
      epoch -= offsetInMilliseconds(dst.save)

    epoch

  adjust = do ->
    FIELD =
      year:   0
      month:  1
      day:    2
      hour:   3
      minute: 4
      second: 5
      milli:  6

    SIGN_OFFSET =
      "-":  -1
      "+":  +1

    explode = (epoch) ->
      record = new Date(epoch)
      fields = [
        record.getUTCFullYear()
        record.getUTCMonth()
        record.getUTCDate()
        record.getUTCHours()
        record.getUTCMinutes()
        record.getUTCSeconds()
        record.getUTCMilliseconds()
      ]

    (epoch, adjustment, request) ->
      fields = explode epoch
      offsets = [ 0, 0, 0, 0, 0, 0, 0 ]
      rest = adjustment.replace(/^\s+/, "")
      loop
        match = ///
          ^                 # start
          ([+-])            # add or subtract
          \s*               # optional space
          (\d+)             # count
          \s+               # manditory space
          ( year            # unit
          | month
          | day
          | hour
          | minute
          | second
          | milli
          )
          s?                # optional plural
          (:?               # either
            (?:
              \s+               # space delimiter
              (.*)              # rest of pattern
            )               # or 
            |
            (.*)            # terminal pattern or garbage
          )
          $                 # end
        ///.exec rest
        if not match
          throw new Error "bad date math pattern #{adjustment}."
        [ sign, count, unit, rest, terminal ] = match.slice 1
        if terminal?
          if terminal isnt ""
            throw new Error "bad date math pattern #{adjustment}."
          break
        offsets[FIELD[unit]] += parseInt(count, 10) * SIGN_OFFSET[sign]
        if rest is ""
          break

      # Milliesonds.
      if offset = offsets[FIELD.milli]
        sum = fields[FIELD.milli] + offset
        fields[FIELD.milli] = (1000 + sum % 1000) % 1000
        fields[FIELD.second] = Math.floor(sum / 1000)

      if offset = offsets[FIELD.second]
        sum = fields[FIELD.second] + offset
        fields[FIELD.second] = ((60 + sum) % 60) % 60
        fields[FIELD.minute] = Math.floor(sum / 60)

      if offset = offsets[FIELD.minute]
        sum = fields[FIELD.minute] + offset
        fields[FIELD.minute] = ((60 + sum) % 60) % 60
        fields[FIELD.hour] = Math.floor(sum / 60)
    
      if offset = offsets[FIELD.hour]
        if request.zone is "UTC"
          sum = fields[FIELD.hour] + offset
          fields[FIELD.hour] = ((24 + sum) % 24) % 24
          fields[FIELD.day] = Math.floor(sum / 24)

        # I look at this and I want a table, and I want to probe that table, but
        # the only way to make a table is to create entries for each shift, for
        # each year, because the time zone data is sparse.
        #
        # This is how you do sparse.
        else
          tzdata = TIMEZONES.zones[request.zone]
          epoch = Date.UTC.apply(null, fields)
          for maybe in tzdata
            break if convertUntil(maybe) < epoch
            zone = maybe
          
          annualRules = []
          ruleIndex = -1
          if rules = TIMEZONES.rules[zone.rules]
            year = new Date(epoch).getUTCFullYear()
            previous = Date.UTC(year - 1, 11, 31)
            for rule, i in rules
              if rule.from <= year and year <= rule.to
                annualRules.push i
                start = ruleToDate(year, rule)
                if start <= epoch and previous < start
                  previous = start
                  ruleIndex = annualRules.length - 1
            rule = null

          # Do I need to stop at the new year, or do I load up the annual rule
          # of the next year?
          offset *= HOUR
          while offset isnt 0
            if offset < 0
              if rule
                epoch -= offsetInMilliseconds(rule.save)
                rule = null

              if ruleIndex is -1
                stop = new Date(year, 0, 1)
              else
                year = new Date(epoch).getUTCFullYear()
                rule = rules[annualRules[ruleIndex]]
                stop = ruleToDate(year, rule)
                ruleIndex--

              difference = Math.max(stop - epoch, offset)

              offset -= difference
              epoch  += difference
            else
              if ruleIndex is annualRules.length -1
                stop = new Date(year, 12, 31)
              else
                ruleIndex++
                year = new Date(epoch).getUTCFullYear()
                stop = ruleToDate(year, annualRules[ruleIndex])
           
          fields = explode epoch

      # Accounts for leap years and days of month.
      if offset = offsets[FIELD.day]
        fields = explode Date.UTC.apply(null, fields) + DAY * offset

      if offset = offsets[FIELD.month]
        increment = offset / Math.abs(offset)
        while offset isnt 0
          month = offset[FIELD.month]
          if month is 0 and offset < 0
            offset[FIELD.month] = 11
            offset[FIELD.year]--
          else if month is 11 and offset > 0
            offset[FIELD.month] = 0
            offset[FIELD.year]++
          else
            offset[FIELD.month] += increment
          offset += increment
          
      fields[FIELD.year] += offsets[FIELD.year]

      Date.UTC.apply null, fields
       

  # The all purpose exported function.
  exports.tz = tz = (date, splat...) ->
    # Assert that we've been given a date.
    throw new Error "invalid arguments" if not date?

    # Create a default request.
    request = { adjustments: [] }

    # Arguments with a "%" are date formats. Arguments that match a timezone are
    # timezones, while arguments that look like locales are locales. If nothing
    # matches, we assume that it is date math.
    for argument in splat
      argument = String(argument)
      if argument.indexOf("%") != -1
        request.format or= argument
      else if TIMEZONES.zones[argument]
        request.zone or= argument
      else if /^\w{2}_\w{2}$/.test argument
        throw new Error "unknown locale" if not LOCALES[argument]
        request.locale or= argument
      else
        request.adjustments.push argument

    # Home of the the author is the default locale for no good reason.
    request.locale or= "en_US"

    # UTC is the default time zone for good reason.
    request.zone or= "UTC"
    
    if request.zone isnt "UTC"
      request.tzdata = TIMEZONES.zones[request.zone]

    # Convert the date argument to seconds since the epoch. The epoch becomes a
    # record used to store date fields, which are accessed by converting the
    # epoch into a Date object. The zone offset field values of the converted
    # object are meaningless and the UTC offset field values represent our
    # working time zone.
    if typeof date is "string"

      # Parse will apply the time zone offset.
      epoch = parse date, request

    else
      # Convert from date to epoch seconds if necessary.
      epoch = if date.getTime then date.getTime() else date

      # Offset by time zone if not UTC.
      if request.zone isnt "UTC"
        epoch = wallclock epoch, request.tzdata

    # Apply date math if any.
    for adjustment in request.adjustments
      epoch = adjust epoch, adjustment, request

    # Apply format if any.
    if request.format
      date = format epoch, request
  
    # Otherwise convert back to UTC if not already UTC.
    else if request.zone isnt "UTC"
      date = utc epoch, request.tzdata

    # Otherwise the seconds since the epoch are already in UTC.
    else
      date = epoch

    date

  tz.locales = (override) ->
    if override?
      for k, v of override
        LOCALES[k] = v
    LOCALES

  tz.timezones = (override) ->
    if override?.zones?
      for k, v of override.zones
        # Set the timezone. Also record the time zone name in the time zone
        # array object here, because can't put it in the JSON time zone files.
        TIMEZONES.zones[k] = v
        TIMEZONES.zones[k].name = k
      for k, v of override?.rules
        TIMEZONES.rules[k] = v
    TIMEZONES
