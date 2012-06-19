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
ok( tz("2000-01-01", "+1 millisecond") == y2k + 1 );

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
moonwalk = tz("1969-07-21T02:56");
// *Let's use `Date.UTC` to check our moon walk timestamp.*
ok( moonwalk == Date.UTC(1969, 6, 21, 2, 56) );

// If you need to parse some other form of date string, we've got a way to do
// that below, but let's look at timezones first.

//
// Date parsing is not the reverse of date formatting. Unless you are deailing
// with a specified date format, you are actually doing natural language
// processing. You start with trying to guess `2/12/2001` based on locale, and
// end up with a monsterous set of localization files that define worlds like
// `fortnight`. 
//
// Formatting is limited by `strftime`, but `strftime` has been rather
// successful. If you're application is reaching out into new markets, you can
// use **Timezone** to first ensure that you're not botching people's
// appointments, then you can provide custom formats, or transform format
// output, to give the perfect date reprsentation.
//
// **Timezone** is designed to 
// However, it is easy to build upon **Timezone** to 
//
// **Timezone** is not 
//
// * Where's my natural language processing so I can say "at the next Tuesday
// after the red barn with blue tomorrow out front turn left" and it will know I
// mean [Dyngus Day](http://dyngusdaybuffalo.com/)?
// * My boss wants me to format dates to say the "2012th Year or Our Lord:
// Batman!" Where's the ordinal number format?
// * Where are those getters and setters? I don't care that they didn't work half
// the time. I just happen to really like cubbyholes.
//
// The design of the **Timezone** library believes that it is a mistake to lump
// all that might ever have something to do with a date into one library.
// **Timezone** is designed with the belief that some things that appear simple,
// such as parsing `"next week"`, are actually much bigger problems.
//
// In fact, the key problem that **Timezone** seeks to avoid is that mistake of
// thinking that date parsing and date formatting are two sides of the same
// coin. They are not. Date formatting is simple, going from a specific point in
// time, through a localized format string is easy. Trying to make sense of
// arbitrary date-like strings is difficult.
//
// formatting, and by making it application specific, we have a well-focused
// time library, instead of a crappy natural language 
//
// Trying to guess the value of
// `12/2/2011` based on locale is a naive first step down a long road of natual
// langauge processing.
//
//
// By focusing on standards, and avoiding locale intensive and application
// specific tasks like parsing `"next Easter"`, **Timezone** can become
// throughly tested and stable, making it a great foundation for time zone
// intensive applications and date parsing libraries.
//
// We can, however, easily build upon **Timezone** using functional composition.
