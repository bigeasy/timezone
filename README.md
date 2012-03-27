# Timezone

Compact, timezone aware time and date library for JavaScript, for use in Node.js
and the browser. 

* http://www.iana.org/time-zones

Timezone is a database friendly, timezone aware replacement for the `Date`
object that implements date parsing, date formatting, and date math.

Timezone replaces the `Date` object with [POSIX
time](http://en.wikipedia.org/wiki/Unix_time), milliseconds since the epoch, for
a cross-platform, internationalized, and durable representation of a point in
time.

The Timezone library uses the [Olson timezone
database](http://cs.ucla.edu/~eggert/tz/tz-link.htm), to create a database of
timezone rules, one per continent, in a compact JSON representation, so you can,
with some confidence, determine the correct local time of any place in the
world, since 1970.

Timezone uses [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) or [RFC
822](http://www.ietf.org/rfc/rfc0822.txt) dates to represent wallclock time. It
can parse any ISO 8601 or RFC 822 date. It can create any date format by
supporting the full compliment of [GNU
date](http://en.wikipedia.org/wiki/Date_%28Unix%29) format specifiers.

## Overview

Timezone is a timezone aware date library for JavaScript that

 * formats dates using UNIX date format specifiers,
 * formats dates adjusting for timezone and daylight savings time,
 * formats dates according to a specified locale,
 * parses RFC 822 and ISO 8601 dates,
 * parses some additional common date formats,
 * parses dates adjusting for timezone and daylight savings time,
 * parses dates according to a specified locale,
 * adds and subtracts intervals in local time adjusting for daylight savings
   time and leap days.

Timezone uses POSIX time, milliseconds since the epoch represented as a
JavaScript `Number`. Timezone does not monkey patch the JavaScript `Date`
object. Timezone replaces the JavaScript `Date` object with POSIX time.

## Time Types

Timezone works with one of two types of date value,

 * POSIX time,
 * or date strings.

Timezone uses POSIX time, milliseconds since the epoch in UTC, for a universal
representation of a point in time.

Timezone uses date strings to represent local time.

The first argument to `tz` is always a date, usually POSIX time as an integer,
or else a date string.

```javascript
// Create a POSIX time integer from a timestamp.
var bicentenial = tz("1976-07-04");
eq(88927498237492734927, bicentenial);

// Now you can use the POSIX time as a date.
eq(98327943274923794329, tz(bicentenial, "+1 millisecond"));

// You can use a date string if you prefer.
eq(98327943274923794329, tz("1976-07-04", "+1 millisecond"));
```

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
time that is approrpriate for most applications.

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
