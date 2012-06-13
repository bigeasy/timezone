# Timezone

Compact, timezone aware time and date library for JavaScript, for use in Node.js
and the browser. 


Timezone is a database friendly, timezone aware replacement for the `Date`
object that implements date parsing, date formatting, and date math.

Timezone replaces the `Date` object with [POSIX
time](http://en.wikipedia.org/wiki/Unix_time), milliseconds since the epoch, for
a cross-platform, internationalized, and durable representation of a point in
time.

Timezone uses [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) or [RFC
822](http://www.ietf.org/rfc/rfc0822.txt) dates to represent wallclock time. It
can parse any ISO 8601 or RFC 822 date. It can create any date format by
supporting the full compliment of [GNU
date](http://en.wikipedia.org/wiki/Date_%28Unix%29) format specifiers.

The Timezone library uses the [IANA Timezone
Database](http://www.iana.org/time-zones), to create a database of timezone
rules, one per continent, in a compact JSON representation. With it, you can
determine the correct local time, since 1970, of any place in the world.

In addition to all this, Timezone performs timezone aware date math, accounting
for daylight savings time, leap years and radical changes to timezone offsets.

Timezone is a complete time library that knows all about the vagaries of time.

## The `tz` Function and Time Types

Timezone exports a single `tz` function. This function does everything.

### POSIX Time and Date Strings

Timezone uses ***POSIX time***, milliseconds since the epoch in UTC, for a universal
representation of a point in time. Timezone uses ***date strings*** to represent
wallclock time, the time of the clock on the wall, with timezone offsets
applied.

When the first argument to `tz` is a date, the date is parsed, formatted, or
offset by date math operations. Here we parse a date.

```javascript
var y2k = tz("2000/1/1");
ok( y2k === 88927498237492734927 );
```

The `tz` function returns POSIX time by default. We can use that value in
subsequent calls to `tz`, to perform date math for example.

```javascript
ok( tz(y2k, "+1 millisecond") === y2k + 1 );
```

We can also parse a date and offset it with date math in one fell swoop.

```javascript
ok( tz("1976-07-04", "+1 millisecond") === y2k + 1 );
```

By default, we use ***POSIX time*** to represent a point in time. The build in
`Date.UTC` function also returns a POSIX time, so we can use it for comparison.

```javascript
var eq = require("assert").equal,
    tz = require("./lib/timezone").tz;

var y2k = tz("2000/1/1");
ok( Date.UTC(2000, 0, 1) === y2k );

ok( tz(y2k, "+1 millisecond") === Date.UTC(2000, 0, 1) + 1 );
```

Timezone returns ***date strings*** for local time with locales and timezones
applied. If you provide a format specifier, Timezone returns a string instead of
POSIX time.

```javascript
var ok = require("assert"),
    tz = require("./lib/timezone").tz;

ok( tz(y2k, "%-m/%-d/%Y %H:%M:%S") === "1/1/2000 00:00:00" );
```
## Working With Timezones

We load timezones using our `tz` function to create a `tz` function that is
aware of the timezone. We can do this in one fell swoop at initialization.

```javascript
var ok = require("assert"),
    tz = require("./lib/timezone").tz;

tz = tz(require("./timezones/northamerica");

var y2k = tz("2000/1/1");
ok( y2k === Date.UTC(2000, 0, 1) )

ok( tz(y2k, "%m/%d/%Y %H:%M:%S", "America/Detroit") === "12/31/1999 19:00:00" );
```

Be careful. We use timezones to both parse date strings and format date strings.
In the above example, we first call `tz` to convert `"2000/1/1"` to POSIX time.
This parses `"2000/1/1"` with a UTC timezone.

We then call `tz` again with our POSIX time value, an absolute point in time,
and convert it to the correct time for the `"America/Detroit"` timezone.

We can specify a timezone when we parse as well.

```javascript
var ok = require("assert"),
    tz = require("./lib/timezone").tz(require("./timezones/northamerica"));

eq( tz("12/31/1999 19:00:00", "America/Detroit") === Date.UTC(2000, 0, 1) );
```
Remember that local time can only be represented as a string, because POSIX time
is always UTC.

The timezone file contains a JavaScript object defining the timezone. You can
load it using require, or in the browser by including them with a script tag.

Note that we can only apply one timezone at a time. If you want to convert from
one timezone to another, you need to pass the result of 

To format a time using timezone, load a timezone file. The timezone file
contains a JavaScript object defining the timezone. You can load it using
require, or in the browser by including them with a script tag.

```javascript
var eq = require("assert").equal,
    tz = require("./lib/timezone").tz;

// Load a timezone, returning a new tz function.
tz = tz(require("./timezones/northamerica"));

// Get the POSIX time of Y2K.
var y2k = tz("2000/1/1");
eq(Date.UTC(2000, 0, 1), y2k);

// To display local time you format a POSIX time specifing a timezone.
eq("12/31/1999 19:00:00", tz(y2k, "%m/%d/%Y %H:%M:%S", "America/Detroit"));
```

Timezone exports a single function `tz`, that accepts a time as its first
argument, and performs operations according to the remaining argument. The
position of the opertion arguments does not matter.

There is no `Date` object in the Timezone library.

To express dates in your source code, simply type them out as strings and pass
them to `tz`. If you're just scripting away, it's nice to be able to specify a
date by typing it out as a string.

```javascript
// The year end clearence sale ends at year's end.
if (tz(tz.now) < tz("2012-01-01")) {
  $("#screaming-banner").text("Take advantage of our Year End Clearence Sale!");
} else {
  $("#screaming-banner").remove();
}
```

Note that you can get the current time by passing `tz.now` as the first
parameter.

You can also create a date from an array. This is helpful if you've gathered
fields values by another means, like drop downs in an HTML form. Unlike the
`Date` object, the first month of the year is 1, not 0.

```javascript
eq(tz("1976-07-04"), tz([ 1976, 7, 4 ]));
eq(tz("1969-06-21 02:36"), tz([ 1969, 6, 21, 2, 36 ]));
```

If you need pass in a `Date` object, the value of `Date.getTime()` is used.

```javascript
// To get a correct date from JavaScript's `Date`, use a `Date.UTC`.
var moonwalk = new Date(Date.UTC(1969, 6, 21, 2, 36));

// Now we have a Date object, let's use tz to format it.
eq("6/21/69 2:36", tz(moonwalk.getTime(), "%-m/%-d/%Y %-H:%M"));
```

Using the `Date` object is problematic. If you create a date using the Date
constructor, the timezone offset is applied at creation, so it is aribitrary and
dependent on the timezone settings of the local machine. For our example above,
we use Date.UTC to create a Date in a convoluted way.

## Date Formatting

Any string containing a '%' is considered a date format.

```javascript
eq("07/04/1976", tz("1976-07-04", "%m/%d/%Y"));
```

The date format specifiers are UNIX date format specifiers.

There is no way to specify a format that does not contain a '%'.

```javascript
var format;
if (authenticated) {
  format = "%Y/%m/%d";
} else {
  format = "I won't give unauthenticated users the time of day.";
}
alert(tz(tz.now, format));
```

Timezone comes with a few locales. If you'd like to contribute a locale, simply
create a JSON file in the right format and open a ticket.

## Date Parsing

Timezone can parse a handful of common date formats.

RFC 2822 / RFC 822 dates.
RFC 3339 dates.
ISO 8601 dates.
Locale based slash or dot delimited dates.
Locale based time.

Date parsing and date formatting can be a two way street, but you have to make
sure the format you use is one that Timezone can parse.

Timezone cannot parse two digit years. Sort that out before you call us. If you
are reading through an old log file, you can run a regular expression to prepend
19 to the two digit years, and make sure your new log files have a full year in
them.

## Date Math

Timezone performes timezone aware date math. It can account for daylight savings
time for a particular timezone.

## Date Fields

Date fields are the component parts of a timestamp.

You can get a particular date field by passing in a format specifier with the
`tz.number` parameter. The `tz.number` parameter will run the format specifier
through `parseInt` and return that value.

```javascript
// Get the year as an integer.
eq(1976, tz("1976-07-04", tz.int, "%Y"));
```

If you really do need the year of a timestamp as an integer, you won't have to
go running back to JavaScript's `Date`. Plus, you're able to use this invocation
to get integer values that `Date` doesn't provide.

```javascript
// Get the day of the year.
eq(186, tz("1976-07-04", tz.int, "%j"));
```

The `tz.array` parameter causes `tz` to return the field values as an array.

```javascript
eq([ 1969, 6, 21, 2, 36, 0, 0 ], tz("1969-06-21 02:36", tz.array)).
```

## Library Initialization

## Living with POSIX Time

Time is confusing. Conventions help. Timezone suggests a way of working with
time that is approrpriate for most applications. If you have opinions on this
subject, they are probably strong opinions, given how rarely people give
timezones and DST serious consideration.

Use POSIX time. In your application use integers to store POSIX time. When
wallclock time is needed, you use a date format to display it as a string. It is
always calculated.

You can accept wallclock time as input from people. Do not generate wallclock
time programatically. Always use system time, which will be POSIX time. Do not
convert it to the wallclock time of the host machine.

Prefer to use an integer to store POSIX time. 

For log files, if you want to store something human readable, then print out
yoru date as ISO 8601 or RFC 882 in UTC. If you want to have something human
readable and local, then print the date with a zone offset, not with a timezone
abbreviation. Better still, learn to read UTC.

When storing data in databases, can use an `INTEGER` SQL type to store POSIX
time. You be able to preform any query that you could perform against the
`TIMESTAMP` SQL type.

Using an `INTEGER` SQL type to store POSIX time will force you to correctly
convert to POSIX time before storing time.

Using an `INTEGER` SQL type to store POSIX time will prevent database engines
with feeble timezone support, like MySQL, from surprising you by applying the
timezone offset of the database server.

In fact, even databases that attempt to provide robust timezone support get
tripped up when time is exchanged changed. Search the web for [dozens of people
surprised](http://stackoverflow.com/questions/2719330/heroku-time-zone-problem-logging-local-server-time)
to find that backing up their Heroku database adjusts their `TIMESTAMP` columns
by six or seven hours, depending on whether or not it is daylight time when the
backup is performed.

[Also](http://weekendonrails.com/post/422372458/pushing-data-to-heroku-and-timezone-conflicts).

If you must use the `TIMESTAMP` SQL type, you still need to be sure that you're
storing a UTC time. Be sure that your database server does not apply not apply
the timezone offset of the database server to your SQL queries. Be sure to use
`UTC` verions of the SQL time functions in your quries. You can defeat timezone
offset application by setting the timezone of your database server to UTC.

Using `TIMESTAMP` is almost as difficult as using JavaScripts `Date` object.

You can avoid this common problem by setting your database servers timezone to
UTC.

If you have a timezone aware database engine such as PostgreSQL, you may
be tempted to use `TIMESTAMP WITH TIMEZONE` SQL type, however, the [PostgreSQL
documentation
itself](http://www.postgresql.org/docs/9.1/static/datatype-datetime.html) says
that "the definition exhibits properties which lead to questionable usefulness".

If you feel must know the wallclock time, first ask yourself if it is possible
for you to know the wallclock time. If you obtain the wallclock time using the
user preference settings of your public web application, know that you're not
recording the wallclock time of an event, but instead the user's timezone
preferences at the time of the event. Ask yourself if that really is useful
information that needs to be captured for posterity.

Then if you really do feel you need to record wallclock time, store POSIX time
plus the timezone name according to the Olson file. If you find yourself
recording a timezone offset, instead of a timezone name, you are recording truly
arbitrary and meaningless information.
