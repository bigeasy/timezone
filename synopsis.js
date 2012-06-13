// A walk-though of **Timezone**, a database friendly, timezone aware replacement
// for the `Date` object that implements timezone conversions, timezone aware
// date math, timezone and locale aware date formatting, for any date, anywhere
// in the world, since the dawn of standardized time. 
//
// **Timezone** is a JavaScript library with no dependencies. It runs in the
// browser and in Node.js. This walk-through is written for Node.js. You can run
// this JavaScript program at the command line like so:
//
// ```
// node synopsis.js
// ```

// ### Functional API

// **Timezone** is a function. When you import **Timezone**, try assigning it to
// a terse variable name. We recommend `tz`.

//
var ok = require("assert")
  , tz = require("timezone");

// ### POSIX Time
//
// **Timezone** replaces the JavaScript `Date` object with [POSIX
// time](http://en.wikipedia.org/wiki/Unix_time) &mdash; milliseconds since the
// epoch in UTC &mdash; for a cross-platform, internationalized, and durable
// representation of a point in time.
//
// POSIX time is simple. POSIX time is always an integer. POSIX time is easy
// store.  POSIX time is easy to sort. POSIX time is easy to compare.
//
// POSIX time is absolute. It always represents a time in UTC.

// *Timezone returns number representing POSIX time by default.*
var y2k = tz("2000-01-01");

// Unless you provide a format specifier, the return value of a call to the
// **Timezone** function will be POSIX time.

// *The POSIX time number is always an integer, usually quite large.*
ok( y2k ==  946684800000 );

// The JavaScript `Date.UTC` function also creates a number representing POSIX
// time, so we can use it check our work in our synopsis.

// *Did **Timezone** give us the correct POSIX time for 2000?*
ok( y2k == Date.UTC(2000, 0, 1) );

// POSIX time is milliseconds since the epoch in UTC. The epoch is New Year's
// 1970. POSIX time for dates before 1970 are negative. POSIX time for dates
// after 1970 are positive.

// *The epoch is January 1st, 1970 UTC.*
ok( tz("1970-01-01") == 0 );

// *Apollo 11 was before the epoch.*
ok( tz("1969-07-21 02:39") < 0 );

// *America's bicentennial was after the epoch.*
ok( tz("1976-07-04") > 0 );

// We can pass POSIX time as the date argument to the **Timezone** function. The
// date argument is always first argument to the **Timezone** function.

// *Add a millisecond to Y2K.*
ok( tz(y2k, "+1 millisecond") === y2k + 1 );

// *Nothing to do, so it returns the same POSIX time value it got.*
ok( tz(y2k) == y2k );

// POSIX time is durable and portable. Any other language you might use, any
// database you might use, will have date facilities that work with POSIX time.
//
// We use POSIX time to represents and unambiguous point in time, free of
// timezone offsets, daylight savings time; all the whimsical manipulations of
// local governments. POSIX time is represented as integer, an efficient data
// type that easily sorts and compares.

// ### Date Strings

// **Timezone** uses [RFC 3999](http://www.ietf.org/rfc/rfc3339.txt) for date
// strings. RFC 3999 is a well-resonsed subset of the ISO 8601 standard, which
// is larger than you might imagine. RFC 3999 is the string date format for use
// in new Internet protocols going forward. It superceeds the RFC 2822 date
// format you're familiar with in HTTP headers.
//
// You've seen us parsing RFC 3999 date strings above. Let's look at a few more
// variations.

// *Parse an RFC 3999 date with a time in seconds.*
ok( tz("2000-01-01T00:00:00") === y2k );

// My goodness, that `T` is silly. It's part of ISO 8601, but RFC 3999 lets us
// replace it with a space so it's easier to read. We're not going to use it
// again.

// *Parse an RFC 3999 date with a time in seconds, using the optional space to
// replace that silly `T`.*
ok( tz("2000-01-01 00:00:00") === y2k );

// *Parse an RFC 3999 date with just the date, no time.*
ok( tz("2000-01-01") === y2k );

// *Parse an RFC 3999 date with the date and a time in minutes.*
ok( tz("2000-01-01 00:00") === y2k );

// *Parse an RFC 3999 date with a time zone offset.*
ok( tz("1999-12-31 00:00-04:00") === y2k );

// We've gone and extended RFC 3999 for two special cases. First, We've added
// milliseconds.

// *Parse an RFC 3999 looking date with the date and a time in milliseconds.*
ok( tz("2000-01-01 00:00:00.0") === y2k );

// Second, we allow timezone offsets to include seconds. You'll see seconds in
// the offsets around the turn of the 19th century.

// *Parse an RFC 3999 date with a time zone offset with seconds.*
ok( tz("1999-12-31 00:00-04:00:00") === y2k );

// We use RFC 3999 date strings for an easy to type, easy to read, unambiguous
// date literal. When we want to type out a date in our code, or store a string
// representation in a message header or log file, we use RFC 3999.

// ### Timezones &mdash; Time O' Clock
//
// When timezones are in play, we're no longer dealing with POSIX time. We're
// dealing with time that has been localized so that it matches the time
// according to the clock on the user's wall.
//
// That's why we call it wall-clock time.
//
// Wall-clock time is determined according to the laws or rules of a government
// or administrative body. Wall-clock time is determined by applying the timezone
// offset for the locality, plus any daylight savings offsets.
//
// We don't venture a guess as to what these offsets might be. No. We use the
// IANA Timezone Database to convert POSIX time to precisely the best guess of
// what the wall-clock of a user's chosen locality might be maybe.
//
// Yes, it's still a guess, because it comes down to a lot of research. However,
// the folks on the tz listserv at the IANA, Arthur David Olson, Paul Eggert,
// and lots of volunteers, have done their best to keep track of all the rule
// changes. They are going to venture a much better guess than our own.

// ### Converting from Wall-Clock Time

// We first need to load a timezone rule set from the IANA timezone database.
// Let's create a `tz` function that knows about most of the US timezones.

// *South American as well, also Canada and Mexico, no Hawaii.*
var us = tz(require("zones/America"));

// Our new **Timezone** function knows the rules for a lot of timezones. Not
// only in the United States, but in Canada, Mexico and all of South America.
// We can use these rules to work with wall-clock time.

// If we don't specify a zone name, out new `us` function will behave just as
// old `tz` function did.

// *Time of the moon walk in UTC.*
var moonwalk = us("1969-07-21 02:39");

// *Does* `Date.UTC` *agree?*
ok( us("1969-07-21 02:39") == Date.UTC(1969, 6, 21, 2, 39) );

// However, if we name a zone rule set, we will parse that RFC 3999 date as
// wall-clock time, not UTC. Here we use the `"America/Detroit"` timezone rule
// set to parse 10:39 PM wall-clock time the day before the moon walk.

// *Hope the kids got to stay up late!*
ok( us("1969-07-20 22:39", "America/Detroit") == moonwalk );

// We can parse 7:39 PM in California.

// *Prime time in California.*
ok( us("1969-07-20 19:39", "America/Los_Angeles") == moonwalk );

// We can't do Amsterdam, however, because we didn't load its rule set.

// *Won't work, didn't load Amsterdam.*
ok( us("1969-07-21 03:39", "Europe/Amsterdam") != moonwalk );

// *Instead of applying Amsterdam's rules, it falls back to UTC.*
ok( us("1969-07-21 02:39", "Europe/Amsterdam") == moonwalk );

// *But, we can load Amsterdam's rules for just this conversion.*
ok( us("1969-07-21 03:39", require("timezone/Europe/Amsterdam"), "Europe/Amsterdam") == moonwalk );

// ### UNIX Date Formats
//
// If you provide a format string, the **Timezone** function will return a
// formatted date string, instead of POSIX time.
//
// **Timezone** implements same date format pattern langauge as GNU's version of
// the UNIX `date` utility. **Timezone** supports the full compliment of [GNU
// date](http://en.wikipedia.org/wiki/Date_%28Unix%29) format specifiers.
//
// This is the same format language used by the UNIX function `strftime`. You'll
// find a version of `strftime` in C, Ruby, Python and Perl. With **Timezone**
// you can also find a version of `strftime` in your JavaScript program.

// *Format POSIX time using a GNU date format string.*
ok( tz(y2k, "%m/%d/%Y") === "01/01/2000", "Date with leading zeros." );

// *You can adjust the padding with padding flags.*
ok( tz(y2k, "%-m/%-d/%Y") === "1/1/2000", "Date without leading zeros." );

// *Two digit year? Yeah, that's right! I don't **learn** lessons.*
ok( tz(y2k, "%-m/%-d/%y") === "1/1/00", "Date with two digit year." );

// *Format date and time.*
ok( tz(moonwalk, "%m/%d/%Y %H:%M:%S") === "07/21/1969 02:39:00" );

// ### Locales
//
// Timezone supports Locales for formatting dates using the GNU Date format
// specifiers.
//
// You apply a locale the same way you apply a timezone. You create a `tz`
// function by passing a locale definition into the `tz` function.

// *Add a Polish locale.*
tz = tz(require("languages/pl_PL"));

// *Time of moonwalk in the default Polish date format.*
ok( tz( moonwalk, "pl_PL", tz.rf822, "America/Detroit" ) == "" );

// *Add a UK, French and German locales.*
tz = tz(require("tz/locales/de_DE"), require("tz/locales/de_DE"),
  require("tz/locales/en_UK"));

// *Dates for three EU capitols.*
ok( tz( moonwalk, "de_DE", "%C", "Europe/Berlin" ) == "" );
ok( tz( moonwalk, "fr_FR", "%C", "Europe/Paris" ) == "" );
ok( tz( moonwalk, "en_UK", "%C", "Europe/London" ) == "" );

// ### Converting to Wall-Clock Time
//
// We don't represent wall-clock time using an integer the way we do with POSIX
// time. We always write out a string. To create that string we simply specify a
// date format.
//
// When we provide a rule set name along with our date format, the **Timezone**
// function will adjust the time by the timezone offset, according to the rules,
// before formatting the date.

var eu = tz(require("timezone/Europe"));

ok( eu(moonwalk, "%F %T", "Europe/Amsterdam") == "1968-07-0X" );

ok( eu(moonwalk, "%F %T", "Europe/Amsterdam") == "1968-07-0X" );

// You can use some common formats to create RFC 3999 strings.
//
// ### Converting Between Timezones
//
// To convert from one timezone to another, we the `tz` function ***must be
// called twice***. Once to convert from the source timezone to POSIX time.
// Then again to convert from POSIX time to the destination timezone.
//
// We already did this once when we created `y2k`. Let's see that again.

// *Parse a date in the default UTC timezone. Apply the timezone of Detroit,
// Michigan.*
y2k = tz("2000/1/1");
ok( y2k == Date.UTC(2000, 0, 1) );
ok( tz(y2k, "%m/%d/%Y %H:%M:%S", "America/Detroit") === "12/31/1999 19:00:00" );

// Whenever we parse a date, we are parsing that date in the context of a
// timezone. If no timezone is specified, we use the default UTC timezone.

// Thus, specify your starting timezone when you parse. Then specify your target
// timezone when you format.

// *Convert a walllclock time from Detroit to Warsaw.*
ok( tz( tz( "2012-04-01 12:00", "America/Detroit" ), "Europe/Warsaw", "%H:%M" ) == "12:00" );

// Remember that we can only represent wallclock time using date strings. POSIX
// time is an absolute point in time and has no concept of timezone.


// ### Date Math
//
// In addition to all this, Timezone performs timezone aware date math,
// accounting for daylight savings time, leap years and the radical changes to
// timezone offsets associated with the politics of time.

// *Add a millisecond to the epoch.*
ok( tz( epoch, "+1 millisecond" ) == 1 );

// *Travel back in time to the moon walk.*
ok( tz(y2k, "-30 years", "-5 months", "-1 days", "-1 hours", "-1 minutes") === moonwalk );

// *Jump to the first Saturday after y2k.*
ok( tz( tz(y2k, "+1 saturday"), "%d" ) === "Friday" );

// *Jump to the first Saturday after y2k, including y2k.*
ok( tz(y2k, "-1 day", "+1 saturday") === y2k );

// Moving across daylight savings time by hour, minute, second or millsecond
// will adjust your wallclock time.

// *Moving across daylight savings time by day lands at the same time.*
//
// Moving across daylight savings time by day, month or year will put you at the
// same time, you won't spring forward.

// *Moving across daylight savings time by day lands at the same time.*

// ### Date Arrays

// Sometimes your input comes not as a stamp, but from a GUI control like a date
// picker. You can use **Timezone** to convert a time provided by a timezone
// challenged UI control, into a time in the prefered timezone of your user.

var picker = [ 1969, 7, 21, 2, 39 ];

ok( moonwalk == tz(picker) );

// ### Creating Partials
//
// If you call `tz` without a date parameter, `tz` will create a new function
// that is a [partial
// application](http://ejohn.org/blog/partial-functions-in-javascript/) of the
// `tz` function. This is how we load timezones and locales.
//
// We can also use this to create custom functions that are specialized with
// `tz` parameters. This can help use reduce noise in our code, if we are
// invoking `tz` with the same set of parameters over and over again.

// *Format a week of days after Y2K.*
ok( tz(y2k, "+1 day", "America/Detroit", "pl_PL", "%c") == "" );
ok( tz(y2k, "+2 days", "America/Detroit", "pl_PL", "%c") == "" );

// *Hmm... This is getting tedious. Reduce the noise by creating a partial with
// the timezone.*
detroit = tz("America/Detroit");

ok( detroit(y2k, "+3 days", "pl_PL", "%c") == "" );
ok( detroit(y2k, "+4 days", "pl_PL", "%c") == "" );

// *Let's get rid of more chatter by creating a partial with the locale.*
hamtramck = detroit("pl_PL");

ok( hamtramck(y2k, "+5 days", "%c") == "" );
ok( hamtramck(y2k, "+6 days", "%c") == "" );
ok( hamtramck(y2k, "+7 days", "%c") == "" );


// ### Initialization

// Timezones and locales are JSON objects. You can load them however you like.
// but I expect that you'll want to do it synchronously. Callbacks are a bit
// much for this sort of thing. Consider loading zones and languages something
// limited to something, something.
//
// Usually, you'll initialize as part of your require statement. Here in our
// example program, we're going to overwrite out `tz` function to show you the
// different forms if one-liner initialization.

// *Reset* `tz` *with a new function that knows about northamerica.*
tz = require("tz").tz(require("tz/zones/northamerica"));

// You can add additional zones as needed.

// *Create a timezone.*
tz = require("tz").tz(require("tz/zones/northamerica"));
tz = tz(require("tz/zones/southamerica"));
tz = tz(require("tz/zones/europe"));

// Locales are loaded just as timezones are loaded. Pass a locale definition
// into the `tz` function to create a new `tz` function.

// *Create a* `tz` *with European timezones and Polish locale.*
tz = require("tz").tz(require("tz/zones/europe"), require("tz/locales/pl_PL"));

// *Create a* `tz` *with all timezones and locales.*
tz = require("tz").tz(require("tz/zones"), require("tz/locales"));
// Maybe your user is in a far off 

// You easily parse other date formats. 

// *Parse an RFC 822 date.*
ok( tz("Sat, 01 Jan 2000 00:00:00 GMT") === y2k );

// While Timezone can parse a handful of time looking things, it doesn't do
// fuzzy parsing. Natural language is out of scope.
//
// It is good enough to read through most computer generated dates. Log files,
// that is. If you're dealing with computer generated date string, you can
// usually run them through a regular expression to get them to where Timezone
// can read them.

// Timezone has some common formats ready to use.

// *Format ISO 8601 date.*
//eq( tz(moonwalk, tz.iso8601date), "12/31/1999 19:00:00" );

// *Format ISO 8601 date and time.*
//ok( tz(moonwalk, tz.iso8601date) === "12/31/1999 19:00:00" );

// *Format ISO 8601 date, time and milliseconds.*
//ok( tz(moonwalk, tz.iso8601date) === "12/31/1999 19:00:00" );

// *Format RFC 822 date.*
//ok( tz(moonwalk, tz.iso8601date) === "12/31/1999 19:00:00" );

// RFC 3339, based on ISO 8601, but, like GNU coreutils, taking advantage of the
// RFC 3339 caveat to replace the `T` with a space for readability.
//ok( tz(y2k, tz.rfc3339date) == "TK" );

// GNU date has all sorts of format variables for you to work with.
// 
// TK: A few more examples.

// ### Functional Composition

// You're probably wondering, what about the rest of it? Where's my natural
// language processing so I can say "at the next Tuesday after the red barn with
// blue tomorrow turn left" and it will know I mean Dyngus Day? My boss wants me to
// format dates to say the "2012th Year or Our Lord: Batman" and you don't have
// cardinality. Turns out, I do need to get the day of the week as an integer
// from a date as cubbyhole.
//
// **Timezone** implements a set of standards and de facto standards. It focuses
// on getting wall-clock time right. It supports a robust, timezone aware
// formatting language, and it it parses an Internet standard date string. With
// all the unit tests in place, there is little reason for **Timezone** to grow,
// so you can count on its size to be small, under 4k, for the foreseeable
// future.
//
// We don't want to grow **Timezone**.
//
// We can, however, easily extend **Timezone** using functional composition.
// 
// Let's look at the missing bits.

// #### Cardinality
//
// We want to print the date as a cardinal number.

function cardinalize (date) {
  var nth = parseInt(date, 10) % 100;
  if (nth > 3 && nth < 21) return date + "th";
  return date + ([ "st", "nd", "rd" ][(nth % 10) - 1] || "th");
}

ok( tz(y2k, "%B %-d, %Y").replace(/\d+/, cardinalize) == "January 1st, 2000" );

// #### Timezones in Date Strings
//
// GNU `date` has a nice feature where you can specify the timezone of a date
// string using `TZ` like so `'TZ="America/Detroit" 1999-12-01 20:00'`. This
// allows you to convert from one timezone to the next in one fell swoop.
//
// Well, we still need to call the **Timezone** function twice, but we can
// easily parse those dates with a function.

// *Extract a specified timezone from a date string.*
function tzdate (date) {
  var match;
  if (match = /^TZ="(\S+)"\s+(.*)$/.exec(date)) {
    return match.slice(1, 3).reverse();
  }
  return date;
}

// *Parse a date with a date string. First one wins.*
ok( eu(tzdate('TZ="Europe/Amsterdam" TK'), "Europe/Paris") == 0 );

// *Parse a date without a date string.*
ok( eu(tzdate('TK'), "Europe/Paris") == 0 );

// #### Plucking Date Fields
//
// You need the day of the week as a integer. No need to go running back to the
// `Date` object for `getUTCDay` &mdash; or `getDay`, have fun with that. You
// can create a function to convert the string result to integer, or better
// still you can use the one that comes with JavaScript.
//
// *Get the year as integer.*
ok( parseInt(tz(y2k, "%Y")) == 2000 );

// *Careful to strip leading zeros so it doesn't become octal.*
ok( parseInt(tz(y2k, "%-d")) == 1 );

// *Here's your date of week.* 
ok( parseInt(tz(y2k, "%-d")) == 1 );

// *Here's your date of week starting Monday.* 

// *Plus some things that `Date` doesn't do, like day of year.*
ok( parseInt(tz("1976-07-04", "%j")) === 186 );

// #### Arrays of Date Fields
//
// What if you want the integer value of a number of different fields?

function array (date) {
  return date.split(/\s+/).map(function (e) { return parseInt(e, 10) });
}

// #### Additional Date Parsers
//
// Create a function that returns our date array format.

// Timezone can get format values as integers, so if really do need the
// component parts of timestamp, you don't need to run back to JavaScript's
// `Date` object.
//
// Wrap your format specifier in a `int()` cast. 

// *Get the month as an integer.*
ok( tz("1976-07-04", "%(%m)") === 7 );

// You can do this with any format specifier, so you can get values that
// JavaScript's `Date` can't provide.

// *Get the day of the year.*

// *Get the week of the year with Sunday as the start of the week.*
ok( tz("1976-07-04", "%(%U)") === 0 );

// *Get the week of the year with Monday as the start of the week.*
ok( tz("1976-07-04", "%(%U)") === 0 );

// If you need more than one field, you can use an `array()` cast. Specify the
// properties you would like to have returned in an array.

//
var deepEqual = require("assert").deepEqual;

// *Fetch year, month and date.*
deepEqual( tz("1976-07-04", "%[%Y, %m, %d]"), [ 1974, 7, 4 ] );

// *Fetch year, month, date, hour and minute.*
deepEqual( tz(moonwalk, "%[%Y, %m, %d, %H, %M]"), [ 1969, 6, 4, 2, 39 ] );

// Now that we can pluck fields, we can get a better notion of whether or not it
// is is a good time to call Warsaw.

// *See if out Detroit call is within office hours in Warsaw.*
var hour = tz( tz( "2012-04-01 12:00", "America/Detroit" ), "Europe/Warsaw", "%(%H)" );
ok( 9 < hour && hour < 17 );
// ### Working With Timezones

// The Timezone library uses the [IANA Timezone
// Database](http://www.iana.org/time-zones), to create a database of timezone
// rules, one per continent, in a compact JSON representation. With it, you can
// determine the correct local time, since 1970, of any place in the world.

// To use timezones, you create a new `tz` function from the existing `tz`
// function. Here we create a new timezone `tz` that is aware of North America
// and Europe.

// *Create a* `tz` *that knows about  North American timezones.*
tz = tz(require("timezone/zones/America"), require("timezone/zones/Europe"));

console.log( "HERE" );
console.log( tz(y2k, "%m/%d/%Y %H:%M:%S") );
console.log( tz(y2k, "%m/%d/%Y %H:%M:%S", "America/Detroit") );
// Now we can format our POSIX time while applying North American timezone
// rules.

// *Format POSIX time applying the timezone rules for Detroit, Michigan.*
ok( tz(y2k, "%m/%d/%Y %H:%M:%S", "America/Detroit") === "12/31/1999 19:00:00" );

console.log("It worked!");
process.exit(0);

// You can see the difference the timezone makes. With it the day of the
// moonwalk changes.

// *Format for UTC.*
ok( tz(moonwalk, "%m/%d/%Y %H:%M %p") === "12/31/1999 19:00:00" );

// *Format with timezone rules for Merritt Island, Florida.*
ok( tz(moonwalk, "%m/%d/%Y %H:%M %p", "America/New_York") === "12/31/1999 19:00:00" );

// We use timezone names to parse a date as well.

// Local time can only be represented as a string, because POSIX time is always
// UTC.
//

// ### Comparisons Across Timezones

// Always use POSIX time to perform comparisons. Convert from wallclock time to
// POSIX time. Let's say you're flying from Vilinus to Vancouver. You ordinarily
// live in Vicksburg, so your calandar is scheduled using the Central Time Zone.

// *Calendar indexed by string representation of POSIX time.*
var calendar =
[ tz( "2012/7/8 6:00 PM", "America/Chicago" ), "Birthday party."
, tz( "2012/7/8 3:00 PM", "America/Chicago" ), "Conference call."
, tz( "2012/7/9 8:00 AM", "America/Chicago" ), "Phone call with Berlin."
];

// Now you want to know what, if any appointments are going to conflict with
// your flight.

var from = tz( "2012/7/8 6:00 AM", "Europe/Vilnius" );
var to = tz( "2012/7/8 6:00 AM", "America/Vancouver" );
for (var i = 0, stop = calendar.length; i < stop; i+=2) {
  var when = calendar[i];
  if (from <= when && when <= to) {
    console.log("Ooops! You need to reschedule: " + calendar[i + 1]);
  }
}

// ### Storing POSIX Time
//
// POSIX time is durable and portable. Store it as an integer in any container
// that will hold an integer.
//
// Using an `INTEGER` SQL type to store POSIX time will prevent database engines
// with feeble timezone support, like MySQL, from surprising you by applying the
// timezone offset of the database server.
//
// If you're having troubles with the `TIMESTAMP` SQL type, for example, use an
// `INTEGER` to store POSIX time instead. You can share that across all SQL
// engines, NoSQL engines, and any POSIX aware programming language.
//
// You can easily compare time for ranges. Your `INTEGER` comparisions will work
// as well as `TIMESTAMP`, maybe better because you won't be tripped up by the
// feeble timezone implementations of some popular database engines. \*cough\*
// MySQL.

// *Time comparisons are simple.*
ok( tz("1970/1/1") < tz("2010/1/1") );

// If you want a string represenation, Timezone is great for date strings too.
//
// ### Swipe

// Timezone can parse a number of different date formats.
// Import tz function and initialize.
var tz = require("tz").tz;
tz.timezones(require("./zones/northamerica"));

// Parse a UTC date.
y2k = tz("2000/01/01");

// Parse a date offset by a time zone.
bicentenial = tz("1976/07/04", "America/Detroit", "%c");

// Date math accounting for daylight savings time.
ago = tz("6 months ago", "America/Detroit");

// Format the current time.
tz(tz.now, "--rfc822");
eq(1976, tz(bicentenial, tz.int, "%Y"));

// Accounts for leap year.
date = tz(bicentenial, "last year"); 

// Format using UNIX date formats.
moonwalk = tz("1969/06/21 02:36", "%c", "America/Houston");

// Accounts for leap year and DST.
date = tz(bicentenial, "last January", "%c", "America/Detroit");
date = tz("now", "last January", "%c", "America/Detroit");
date = tz(new Date(), "last January", "%c", "America/Detroit");

// Format using a locale.
bicentenial = tz("1989/07/14", "Europe/Paris", "fr_FR", "%c");

// Convert time zones.
bicentenial = tz(tz("1989/07/14", "Europe/Paris"), "America/Detroit", "%c");

// Also, note that, I'd considered what it meant to go the other way, to parse
// timezone offsets. The offsets themselves can be parsed. The timezone
// abbreviations cannot be parsed. Something that I'd considered in the past
// with the same conclusion. Something I'll consider in the future with the same
// conclusion.

// Recently, I rediscovered one of my favorite comments from the Olson database...

// > The UNIX Version 7 "timezone" function is not present in this package; it's
// > impossible to reliably map timezone's arguments (a "minutes west of GMT"
// > value and a "daylight saving time in effect" flag) to a time zone
// > abbreviation, and we refuse to guess.

// I'm sure I'll ponder whether I'm supposed to support this again at some point
// in the future, but in my notes for this commit, I have out of scope written
// in all caps. It seems that, when I think about it for a while, I'm angry at
// the notion of being responsible for such a thing.

// From the Olson files Theory...
// 
// Application writers should note that these abbreviations are ambiguousin
// practice: e.g. `EST' has a different meaning in Australia than it does in the
// United States.  In new applications, it's often better to use numeric UTC
// offsets like `-0500' instead of time zone abbreviations like `EST'; this
// avoids the ambiguity.
//
// Need a place to put maybes.
//
// All natural language processing is OUT OF SCOPE.

// As you saw above

// *Parse a date string and add millisecond.*
ok( tz("2000-01-01", "+1 millisecond") === y2k + 1 );

// *An event that occured in the first full week after Y2K.*
ok( tz("2000-01-02") < tz("2000-01-01", "-1 day", "+1 monday") );

// Timezone accepts either a POSIX time integer, or else an RFC 3999 date
// string. It always returns a POSIX time integer unless a `strftime` format
// string is present.

// *Note the extra call to `tz` that does nothing.*
ok( tz(tz("2000-01-01")) == y2k );

// When you need the time of the system clock, just call `tz()` with no
// arguments. If you want to do date math or formatting with the current time,
// call `tz()` and pass its return value in as the date argument to another
// call to `tz`.

// *Today is greater than yesterday.*
ok( tz(tz(), "-1 day") < tz() );

// *Today is greater than the epoch.*
ok( tz() > tz("1970-01-01") );

var moonwalk;

// *Parse date and time.*
moonwalk = tz("1969-07-21T02:39");
// *Let's use `Date.UTC` to check our moon walk timestamp.*
ok( moonwalk === Date.UTC(1969, 6, 21, 2, 39) );

// If you need to parse some other form of date string, we've got a way to do
// that below, but let's look at timezones first.

