// A walkthough of **Timezone**, a database friendly, timezone aware replacement
// for the `Date` object that implements date parsing, date formatting, and date
// math.
//
// Timezone is a JavaScript library with no dependencies. It runs in the browser
// and in Node.js. This walkthrough is in Node.js.  You can run this JavaScript
// program with `node synopsis.js`.

//
var ok = require("assert"),
    eq = require("assert").equal,
    tz = require("./lib/timezone").tz;

// ### POSIX Time
//
// Timezone replaces the `Date` object with [POSIX
// time](http://en.wikipedia.org/wiki/Unix_time), milliseconds since the epoch,
// for a cross-platform, internationalized, and durable representation of a
// point in time.

// *Timezone returns number representing POSIX time by default.*
var y2k = tz("2000/1/1");

// *The number is always an integer.*
ok( y2k ===  946684800000 );
// *The built in* `Date.UTC` *function also creates a number POSIX representing
// posix time, so we can use it check our work.*
ok( y2k === Date.UTC(2000, 0, 1) );

// The `tz` function returns POSIX time by default. We can use that value in
// subsequent calls to `tz`, to perform date math for example.

// *Add a millisecond to Y2K.*
ok( tz(y2k, "+1 millisecond") === y2k + 1 );

// We can also parse a date and offset it with date math in one fell swoop.

// *Add a millisecond to Y2K.*
ok( tz("2000/1/1", "+1 millisecond") === y2k + 1 );

// POSIX time is durable and portable. It represents and unambiguous point in
// time, free of timezone offsets, daylight savings time, and all the other
// whimsical maniplutations of local governments.

// POSIX time is perfect for sorting and comparisons.

// *An event that occured in the first full week after Y2K.*
ok( tz("2000/01/03") < tz("2000/01/01", "+1 monday", "+7 days") );

// *Today is greater than yesterday.*
ok( tz(tz.now, "-1 day") < tz(tz.now) );

// *The epoch is January 1st, 1970 UTC.*
ok( tz("1970/01/01") === 0 );

// *Today is greater than the epoch.*
ok( tz(tz.now) > tz("1970/01/01") );

// *Apollo 11 was before the epoch.*
ok( tz("1969-07-21 02:39") < 0 );

// ### Date Strings

// Timezone uses [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) or [RFC
// 822](http://www.ietf.org/rfc/rfc0822.txt) dates to represent wallclock time.
// It can parse any ISO 8601 or RFC 822 date.

// *Parse an ISO 8601 date.*
ok( tz("2000-01-01T00:00:00") === y2k );

// *Parse a date that kinda looks like an ISO 8601 date.*
ok( tz("2000-01-01 00:00:00") === y2k );

// *Parse just the date.*
ok( tz("2000-01-01") === y2k );

var moonwalk;

// *Parse date and time.*
moonwalk = tz("1969-07-21T02:39");
// *Let's use `Date.UTC` to check our moon walk timestamp.*
ok( moonwalk === Date.UTC(1969, 6, 21, 2, 39) );

// *Parse an RFC 822 date.*
ok( tz("Sat, 01 Jan 2000 00:00:00 GMT") === y2k );

// *Parse a slash delimited date.*
ok( tz("2000/1/1") === y2k );

// *Parse a US English slash delimited date.*
ok( tz("1/1/2000") === y2k );

// While Timezone can parse a handful of time looking things, it doesn't do
// fuzzy parsing. Natural language is out of scope.
//
// It is good enough to read through most computer generated dates. Log files,
// that is. If you're dealing with computer generated date string, you can
// usually run them through a regular expression to get them to where Timezone
// can read them.

// ### GNU Date Formats

// If you provide a format string, `tz` will return a formatted date string,
// instead of POSIX time.
//
// Timezone can create any date format by supporting the full compliment of [GNU
// date](http://en.wikipedia.org/wiki/Date_%28Unix%29) format specifiers.

// *Format POSIX time using a GNU date format string.*
ok( tz(y2k, "%m/%d/%Y") === "01/01/2000" );

// *You can adjust the padding with padding specifiers.*
ok( tz(y2k, "%-m/%-d/%Y") === "1/1/2000" );

// *Two digit year? Yeah, that's right! I don't **learn** lessons.*
ok( tz(y2k, "%-m/%-d/%y") === "1/1/00" );

// *Format date and time.*
ok( tz(moonwalk, "%m/%d/%Y %H:%M:%S") === "07/21/1969 02:39:00" );

// Timezone has some common formats ready to use.

// *Format ISO 8601 date.*
eq( tz(moonwalk, tz.iso8601date), "12/31/1999 19:00:00" );

// *Format ISO 8601 date and time.*
ok( tz(moonwalk, tz.iso8601date) === "12/31/1999 19:00:00" );

// *Format ISO 8601 date, time and milliseconds.*
ok( tz(moonwalk, tz.iso8601date) === "12/31/1999 19:00:00" );

// *Format RFC 822 date.*
ok( tz(moonwalk, tz.iso8601date) === "12/31/1999 19:00:00" );

// RFC 3339, based on ISO 8601, but, like GNU coreutils, taking advantage of the
// RFC 3339 caveat to replace the `T` with a space for readability.
ok( tz(y2k, tz.rfc3339date) == "TK" );

// GNU date has all sorts of format variables for you to work with.
// 
// TK: A few more examples.

// ### Working With Timezones

// The Timezone library uses the [IANA Timezone
// Database](http://www.iana.org/time-zones), to create a database of timezone
// rules, one per continent, in a compact JSON representation. With it, you can
// determine the correct local time, since 1970, of any place in the world.

// To use timezones, you create a new `tz` function from the existing `tz`
// function. Here we create a new timezone `tz` that is aware of North America
// and Europe.

// *Create a* `tz` *that knows about  North American timezones.*
tz = tz(require("./timezones/northamerica"), require("./timezones/europe"));

// Now we can format our POSIX time while applying North American timezone
// rules.

// *Format POSIX time applying the timezone rules for Detroit, Michigan.*
ok( tz(y2k, "%m/%d/%Y %H:%M:%S", "America/Detroit") === "12/31/1999 19:00:00" );

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

// ### Locales
//
// Timezone supports Locales for formatting dates using the GNU Date format
// specifiers.
//
// You apply a locale the same way you apply a timezone. You create a `tz`
// function by passing a locale definition into the `tz` function.

// *Add a Polish locale.*
tz = tz(require("tz/locales/pl_PL"));

// *Time of moonwalk in the default Polish date format.*
ok( tz( moonwalk, "pl_PL", tz.rf822, "America/Detroit" ) === "" );

// *Add a UK, French and German locales.*
tz = tz(require("tz/locales/de_DE"), require("tz/locales/de_DE"),
  require("tz/locales/en_UK"));

// *Dates for three EU capitols.*
ok( tz( moonwalk, "de_DE", tz.rf822, "Europe/Berlin" ) === "" );
ok( tz( moonwalk, "fr_FR", tz.rf822, "Europe/Paris" ) === "" );
ok( tz( moonwalk, "en_UK", tz.rf822, "Europe/London" ) === "" );

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

// ### Initialization

// Timezones and locales are JSON objects. You can load them however you like.
// but I expect that you'll want to do it synchrhously, at startup.
// Synchronous, because callbacks at startup is a bit much.
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

// ### Plucking Date Fields

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
ok( tz("1976-07-04", "%(%j)") === 186 );

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


// ### Partial Application Hacks
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
