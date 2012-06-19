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
//
// You can find a copy where **Timezone** is installed or [download a
// copy](https://raw.github.com/bigeasy/timezone/master/synopsis.js) from
// GitHub.

// ### Functional API

// **Timezone** is a function. When you import **Timezone**, try assigning it to
// a terse variable name. We recommend `tz`.

//
var ok = require("assert")
  , eq = require("assert").equal
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
eq( y2k, 946684800000 );

// The JavaScript `Date.UTC` function also creates a number representing POSIX
// time, so we can use it check our work in this synopsis.

// *Did **Timezone** give us the correct POSIX time for 2000?*
eq( y2k, Date.UTC(2000, 0, 1) );

// POSIX time is milliseconds since the epoch in UTC. The epoch is New Year's
// 1970. POSIX time for dates before 1970 are negative. POSIX time for dates
// after 1970 are positive.

// *The epoch is January 1st, 1970 UTC.*
eq( tz("1970-01-01"), 0 );

// *Apollo 11 was before the epoch.*
ok( tz("1969-07-21 02:56") < 0 );

// *America's bicentennial was after the epoch.*
ok( tz("1976-07-04") > 0 );

// We can pass POSIX time as the date argument to the **Timezone** function. The
// date argument is always first argument to the **Timezone** function.

// *Add a millisecond to Y2K.*
eq( tz(y2k, "+1 millisecond"), y2k + 1 );

// *Nothing to do, so it returns the same POSIX time value it got.*
eq( tz(y2k), y2k );

// POSIX time is durable and portable. Any other language you might use, any
// database you might use, will have date facilities that work with POSIX time.
//
// We use POSIX time to represent an unambiguous point in time, free of timezone
// offsets, daylight savings time; all the whimsical manipulations of local
// governments.
//
// POSIX time is represented as integer, an efficient data type that easily
// sorts and compares.

// ### Date Strings

// **Timezone** uses [RFC 3999](http://www.ietf.org/rfc/rfc3339.txt) for date
// strings. RFC 3999 is a well-reasoned subset of the ISO 8601 standard, which
// is larger than you might imagine. RFC 3999 is the string date format for use
// in new Internet protocols going forward. It supersedes the RFC 2822 date
// format you're familiar with in HTTP headers.
//
// You've seen us parsing RFC 3999 date strings above. Let's look at a few more
// variations.

// *Parse an RFC 3999 date with a time in seconds.*
eq( tz("2000-01-01T00:00:00"), y2k );

// My goodness, that `T` is silly. It's part of ISO 8601, but RFC 3999 lets us
// replace it with a space so it's easier to read. We're not going to use it
// again.

// *Parse an RFC 3999 date with a time in seconds, using the optional space to
// replace that silly `T`.*
eq( tz("2000-01-01 00:00:00"), y2k );

// *Parse an RFC 3999 date with just the date, no time.*
eq( tz("2000-01-01"), y2k );

// *Parse an RFC 3999 date with the date and a time in minutes.*
eq( tz("2000-01-01 00:00"), y2k );

// *Parse an RFC 3999 date with the date and a time in seconds.*
eq( tz("2000-01-01 00:00:00"), y2k );

// *Parse an RFC 3999 date with a time zone offset.*
eq( tz("1999-12-31 20:00-04:00"), y2k );

// We've gone and extended RFC 3999 for two special cases.

// We've added milliseconds.

// *Parse an RFC 3999 looking date with the date and a time in milliseconds.*
eq( tz("2000-01-01 00:00:00.0"), y2k );

// Back in the day, not recently, there were some localities that specified
// their timzeone offset down to the second. Our timezone database goes back to
// the 19th century, when these exacting rules were in effect, so we allow
// timezone offsets to include seconds.

// *Parse an RFC 3999 date with a time zone offset with seconds.*
eq( tz("1999-12-31 20:00-04:00:00"), y2k );

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
var us = tz(require("timezone/America"));

// We've created a new **Timezone** function an named it `us`. Our new
// **Timezone** function knows the rules for a lot of timezones. Not only in the
// United States, but in Canada, Mexico and all of South America. We can use
// these rules to work with wall-clock time.

// If we don't specify a zone name, out new `us` function will behave just as
// old `tz` function did.

// *Time of the moon walk in UTC.*
var moonwalk = us("1969-07-21 02:56");

// *Does* `Date.UTC` *agree?*
eq( us("1969-07-21 02:56"), Date.UTC(1969, 6, 21, 2, 56) );

// However, if we name a zone rule set, we will parse that RFC 3999 date as
// wall-clock time, not UTC. Here we use the `"America/Detroit"` timezone rule
// set to parse 10:39 PM wall-clock time the day before the moon walk.

// *One small step for [a] man...*
eq( us("1969-07-20 21:56", "America/Detroit"), moonwalk );

// We can parse 7:39 PM in California.

// *...one giant leap for mankind.*
eq( us("1969-07-20 19:56", "America/Los_Angeles"), moonwalk );

// We can't do Amsterdam, however, because we didn't load its rule set.

// *Won't work, didn't load Amsterdam.*
ok( us("1969-07-21 03:56", "Europe/Amsterdam") != moonwalk );

// *Instead of applying Amsterdam's rules, it falls back to UTC.*
eq( us("1969-07-21 02:56", "Europe/Amsterdam"), moonwalk );

// We can load Amsterdam's rules for just this conversion. Here we bot include
// the rules for Amsterdam with `require` and select using the timezone string
// `"Europe/Amsterdam"`.

// *Load Amsterdam's rules for just this conversion.*
eq( us("1969-07-21 03:56", require("timezone/Europe/Amsterdam"), "Europe/Amsterdam"), moonwalk );

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
// find a version of `strftime` baked right into C, Ruby, Python, Perl and Lua.
// With **Timezone** you can also find a version of `strftime` in your
// JavaScript program.

// *Format POSIX time using a GNU date format string.*
eq( tz(y2k, "%m/%d/%Y"), "01/01/2000" );

// *You can adjust the padding with padding flags.*
eq( tz(y2k, "%-m/%-d/%Y"), "1/1/2000" );

// *Two digit year? Yeah, that's right! I don't **learn** lessons.*
eq( tz(y2k, "%-m/%-d/%y"), "1/1/00" );

// *Format date and time.*
eq( tz(moonwalk, "%m/%d/%Y %H:%M:%S"), "07/21/1969 02:56:00" );

// *12 hour clock formats.*
eq( tz(moonwalk, "%A, %B %-d, %Y %-I:%M:%S %p"), "Monday, July 21, 1969 2:56:00 AM" );

// **Timezone** supports all of the GNU `date` extensions, including some date
// calcuations.

// *Day of the year.*
eq( tz(moonwalk, "%j") , "202" );

// *Day of the week zero-based index starting Sunday.*
eq( tz(moonwalk, "%w"), "1" );

// *Day of the week one-based index starting Monday.*
eq( tz(moonwalk, "%u"), "1" );

// *Week of the year index week starting Monday.*
eq( tz(moonwalk, "%W"), "29" );

// *ISO 8601 [week date](http://en.wikipedia.org/wiki/ISO_8601#Week_dates) format.*
eq( tz(moonwalk, "%G-%V-%wT%T"), "1969-30-1T02:56:00" );

// #### TODO Zone formats.

// ### Converting to Wall-Clock Time
//
// We only use integers to represent POSIX time.
//
// To represent wall-clock time we use an RFC 3999 date string. We run our date
// strings through the date string parser specifying a time zone rule set to get
// POSIX time.
//
// To convert to wall-clock time, provide and RFC 3999 date format to the `tz`
// function, along with the name of time zone rule set.
//
//
// When we provide a rule set name along with our date format, the **Timezone**
// function will adjust the time by the timezone offset, according to the rules,
// before formatting the date.
//
// Here we create a new `eu` **Timezone** function with all of the `Europe` time
// zone rules loaded. We then convert POSIX time to wall-clock time for some
// European cities.

//
var eu = tz(require("timezone/Europe"));

eq( eu(moonwalk, "%F %T", "Europe/Amsterdam")
  , "1969-07-21 03:56:00" );
eq( eu(moonwalk, "%F %T", "Europe/Istanbul")
  , "1969-07-21 04:56:00" );

// If you want to remember the exact time without having to keep track of the
// rules, include the time zone offset in the format.


//
eq( eu(moonwalk, "%F %T%^z", "Europe/Vilinus")
  , "1969-07-21 02:56:00Z" );
eq( eu(moonwalk, "%F %T%^z", "Europe/Lisbon")
  , "1969-07-21 03:56:00+01:00" );

// You can use some common formats to create RFC 3999 strings.

// ### Converting Between Timezones
//
// To convert wall-clock time from one time zone to another, we first convert
// the wall-clock time of the source time zone to POSIX time. We then convert
// from POSIX time to the wall-clock time of the destination time zone.
//
// To do this, we call the **Timezone** function twice.

//
var posix = us("1969-07-20 21:56", "America/Detroit");
eq( posix, moonwalk );

var wallclock = eu(posix, "%F %T", "Europe/Amsterdam")
eq( wallclock , "1969-07-21 03:56:00" );

// All at once.

//
eq( eu( us("1969-07-20 21:56", "America/Detroit"), "Europe/Amsterdam", "%F %T" )
     , "1969-07-21 03:56:00" );

// Whenever we parse a date, we are parsing that date in the context of a
// timezone. If no timezone is specified, we use the default UTC timezone.

// Thus, specify your starting timezone when you parse. Then specify your target
// timezone when you format.

// *It's noon in Detroit. What time is it in Warsaw?*
eq( eu(us("2012-04-01 12:00", "America/Detroit" ), "Europe/Warsaw", "%H:%M" ), "18:00" );

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
us = us(require("timezone/pl_PL"));

// *Time of moonwalk in the default Polish date format.*
eq( us( moonwalk, "pl_PL", "%c", "America/Detroit" )
  , "nie, 20 lip 1969, 21:56:00 EST" );

// *Add a UK, French and German locales.*
var eu = tz( require("timezone/en_GB")
           , require("timezone/fr_FR")
           , require("timezone/de_DE")
           , require("timezone/Europe") );

// *Time of moon walk in three European cities.*
eq( eu( moonwalk, "en_GB", "%c", "Europe/London" )
  , "Mon 21 Jul 1969 03:56:00 BST" );
eq( eu( moonwalk, "fr_FR", "%c", "Europe/Paris" )
  , "lun. 21 juil. 1969 03:56:00 CET" );
eq( eu( moonwalk, "de_DE", "%c", "Europe/Berlin" )
  , "Mo 21 Jul 1969 03:56:00 CET" );

// ### Date Math
//
// In addition to all this, Timezone performs timezone aware date math,
// accounting for daylight savings time, leap years and the radical changes to
// timezone offsets associated with the politics of time.

// *Add a millisecond to the epoch.*
eq( tz( 0, "+1 millisecond" ), 1 );

// *Travel back in time to the moon walk.*
eq( tz(y2k, "-30 years", "-5 months", "-10 days", "-21 hours", "-4 minutes", "%c"), tz(moonwalk, "%c") );

// *Jump to the first Saturday after y2k.*
eq( tz(y2k, "+1 saturday", "%A %d"), "Saturday 08" );
// *Jump to the first Saturday after y2k, including y2k.*
eq( tz(y2k, "-1 day", "+1 saturday", "%A %d"), "Saturday 01" );

// Moving across daylight savings time by hour, minute, second or millsecond
// will adjust your wallclock time.

// *Moving across daylight savings time by day lands at the same time.*
//
// Moving across daylight savings time by day, month or year will put you at the
// same time, you won't spring forward.

// *Moving across daylight savings time by day lands at the same time.*

// ### Date Arrays

// The **Timezone** function will also accept an array of integers as a date
// intput. It will treat this value as wall-clock time and convert it according
// a specified time zone rule set.
//
// The date array is useful when working with GUI controls like a series of drop
// downs.
// 
// The date array is also a good candidate for the output of a date parsing
// function. The date array is an easy data structure to populate
// programatically while parsing a date string.

//
var picker = [ 1969, 7, 20, 21, 56 ];

eq( us(picker, "America/Detroit"), moonwalk );

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

// *We've been using parital functions to load time zones and locales.*
us = us( require("timezone/pl_PL") );

// *Format a week of days after Y2K.*
eq( us(y2k, "+1 day", "America/Detroit", "pl_PL", "%A"), "sobota" );
eq( us(y2k, "+2 days", "America/Detroit", "pl_PL", "%A"), "niedziela" );

// *Reduce the noise by creating a partial with the timezone.*
detroit = us("America/Detroit");

eq( detroit(y2k, "+3 days", "pl_PL", "%A"), "poniedziałek" );
eq( detroit(y2k, "+4 days", "pl_PL", "%A"), "wtorek" );

// *Let's get rid of more chatter by creating a partial with the locale.*
hamtramck = detroit("pl_PL");

eq( hamtramck(y2k, "+5 days", "%A"), "środa" );
eq( hamtramck(y2k, "+6 days", "%A"), "czwartek" );
eq( hamtramck(y2k, "+7 days", "%A"), "piątek" );

// ### Initialization

// Locales and time zones are defined by rules, locale rules and time zone
// rules. Locales and time zones are specified by a name, either a locale string
// in the form of `en_US`, or a time zone string in the form of
// `America/Detroit`.
//
// In order to apply either a locale or a time zone rule set, you must provide
// the **Timezone** function with both the rule data and the rule name.
//
// Rather than providing both arguments each time, you'll generally want to
// load a number of rule sets into a partial application funcition. We've done
// this a number of times already in our walk-though.

// *Doesn't know anything about `Asia/Tashkent`, defaults to UTC.*
eq( tz(moonwalk, "Asia/Tashkent", "%F %T%^z"), "1969-07-21 02:56:00Z" );

// *Load all of the timezone data for Asia.*
var asia = tz(require("timezone/Asia"));

// *Now `Asia/Tashkent` is available to the our `asia` function.*
eq( asia(moonwalk, "Asia/Tashkent", "%F %T%^z"), "1969-07-21 08:56:00+06:00" );

// If you later need more timezone data, you can add it using your existing
// partial function.

// *Add the Pacific Islands to Asia.*
asia = asia(require("timezone/Pacific"));

// *Now we have Hawaii.*
eq( asia(moonwalk, "Pacific/Honolulu", "%F %T%^z"), "1969-07-20 16:56:00-10:00" );

// Note that you can provide the rule data and the rule name at the same time.

// *Load Asia and select Tashkent in one call.*
eq( tz(moonwalk, require("timezone/Asia"), "Asia/Tashkent", "%F %T%^z"), "1969-07-21 08:56:00+06:00" );

// It is generally preferable to create a partial function that loads the data
// you need, however.

// Locales are loaded in the same fashion. 

// *Knows nothing of Polish, defaults to `en_US`.*
eq( tz(moonwalk, "pl_PL", "%A"), "Monday");

// *Create a Polish aware partial function.*
var pl = tz(require("timezone/pl_PL"));
eq( pl(moonwalk, "pl_PL", "%A"), "poniedziałek");

// ### Functional Composition

// **Timezone** implements a set of standards and de facto standards.
// **Timezone** is not extensible. Quite the opposite. **Timezone** is sealed.
//
// **Timezone** focuses on getting wall-clock time right. It supports a robust,
// timezone aware formatting language, and it it parses an Internet standard
// date string. With all the unit tests in place, there is little reason for
// **Timezone** to add new features, so you can count on its size to be small,
// under 3k, for the foreseeable future.
//
// Rather than opening up **Timezone** to extend it, we build on top of it,
// through functional composition. **Timezone** is a function in a functional
// language. It is configurable and easy to pass around.

// #### Ordinal Numbers
//
// You want to print the date as a ordinal number.
//
// Create a function that convert a number to an ordinal number, then write a
// regular expression to match numbers in your format string that you want to
// ordinalize.

//
function cardinalize (date) {
  var nth = parseInt(date, 10) % 100;
  if (nth > 3 && nth < 21) return date + "th";
  return date + ([ "st", "nd", "rd" ][(nth % 10) - 1] || "th");
}

ok( tz(y2k, "%B %-d, %Y").replace(/\d+/, cardinalize), "January 1st, 2000" );

// #### Plucking Date Fields
//
// The original `Date` object is missing a lot of functionality, but includes a
// lot of getters and setters. I think they're silly and that's why **Timezone**
// is a function and not an object. Because time is not object-oriented.
//
// However, you do find that you need to get properties as integers, just use
// date format and make an easy conversion to integer.

// *Get the year as integer.*
ok( +(tz(y2k, "%Y")) === new Date(y2k).getUTCFullYear() );

// *Careful to strip leading zeros so it doesn't become octal.*
ok( +(tz(y2k, "%-d")) === new Date(y2k).getUTCDate() );

// *January is one.*/
ok( +(tz(y2k, "%-m")) === new Date(y2k).getUTCMonth() + 1 );

// *Here's your date of week.* 
ok( parseInt(tz(y2k, "%-w")) === new Date(y2k).getUTCDay() );

// Plus there are a few properties you can get that are not available to date.

// *Here's your date of week starting Monday.* 
ok( +(tz(moonwalk, "%-V")) === 30 );

// *Day of the year.*
ok( +(tz(moonwalk, "%-j")) === 202 );

// #### Arrays of Date Fields

// What if you want the integer value of a number of different fields?

// *Split a string into words and convert the words to integers.*
function array (date) {
  return date.split(/\s+/).map(function (e) { return parseInt(e, 10) });
}

var date = array(tz(moonwalk, "%Y %m %d %H %M %S"));

eq( date[0], 1969 );
eq( date[1], 7 );
eq( date[2], 21 );
eq( date[3], 2 );
eq( date[4], 56 );

// #### Additional Date Parsers
//
// Create a function that returns our date array format.

// #### Timezones in Date Strings

// GNU `date` has a nice feature where you can specify the timezone of a date
// string using `TZ` like so `'TZ="America/Detroit" 1999-12-01 20:00'`. This
// allows you to store a string with a timezone.

// *Extract a specified timezone from a date string.*
function tzdate (date) {
  var match;
  if (match = /^TZ="(\S+)"\s+(.*)$/.exec(date)) {
    var a = match.slice(1, 3).reverse();
    return a;
  }
  return date;
}

// *Parse a date with a date string. First one wins.*
eq( eu(eu(tzdate('TZ="Europe/Istanbul" 2012-02-29 04:00')), "Europe/Amsterdam", "%F %T"), "2012-02-29 03:00:00" );

// *Parse a date without a date string, defaults to UTC.*
eq( eu(eu("2012-02-29 04:00"), "Europe/Amsterdam", "%F %T"), "2012-02-29 05:00:00" );
