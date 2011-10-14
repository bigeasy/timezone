var eq = require("assert").equal;
var tz = require("./lib/timezone").tz;

// Timezones and locales are JSON objects. You can load them however you like.
// but I expect that you'll want to do it synchrhously, at startup.
// Synchronous, because callbacks at startup is a bit much.
tz.timezones(require("./test/data/northamerica"));
tz.timezones(require("./test/data/europe"));

// Timezones and locales are global to the application, because timezones and
// locales are, literally, global, to the world.
tz.locale(require("./test/data/pl_PL"));
tz.locale(require("./test/data/fr_FR"));
tz.locale(require("./test/data/de_DE"));

// Timezone creates dates in POSIX time, milliseconds since the epoch.  for an
// unambiguous point in time.
var y2k = tz("2000/1/1");
eq(946684800000, y2k);

// Timezone returns POSIX time by default.
eq(946684800001, tz(y2k, "+1 millisecond");

// If you provide a format specifier, Timezone returns a string.
eq("1/1/2000 00:00:00", tz(y2k, "%m/%d/%Y %H:%M:%S");

// To display local time you format a POSIX time specifing a timezone.
tz("12/31/1999 19:00:00", tz(y2k, "%m/%d/%Y %H:%M:%S", "America/Detroit"));

// Local time can only be represented as a string, because POSIX time is always
// UTC. But, it's easy enough to go from local time to POSIX time. Pass in your
// local time as a date string along with the local timezone.
tz(y2k, tz("12/31/1999 19:00:00", "America/Detroit"));

// Date formats apply a locale, so you can the names and abbreviations of the
// display day of week and month names. 

// Date formats are, in fact, UNIX date formats, with feature parity with the
// date implementation in GNU coreutils.

// Timezone has a few built in date formats that are standardized formats, and
// not locale specific. Use them in your log files, or store them in your
// databases, they are durable and easy to parse.
eq("TK", tz(y2k, tz.rfc822));

// ISO 8601 timestamps.
eq("TK", tz(y2k, tz.iso8601date));
eq("TK", tz(y2k, tz.iso8601time));
eq("TK", tz(y2k, tz.iso8601ns));

// RFC 3339, based on ISO 8601, but, like GNU coreutils, taking advantage of the
// RFC 3339 caveat to replace the `T` with a space for readability.
eq("TK", tz(y2k, tz.rfc3339date));
eq("TK", tz(y2k, tz.rfc3339time));
eq("TK", tz(y2k, tz.rfc3339ns));

// Timezone can get format values as integers, so if really do need the
// component parts of timestamp, you don't need to run back to JavaScript's Date
// object.
tz(7, tz("1976-07-04", tz.number, "%m"));

// You can do this with any format specifier, so you can get values that
// JavaScript's `Date` can't provide, like the day of the year.
tz(186, tz("1976-07-04", tz.number, "%j"));

// Get the week of the year with Sunday as the start of the week.
tz(0, tz("1976-07-04", tz.number, "%U"));

// Get the week of the year with Monday as the start of the week.
tz(0, tz("1976-07-04", tz.number, "%U"));

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
eq 1976, tz(bicentenial, tz.int, "%Y");

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

// Reduce the noise by creating custom tz functions.
detroit = tz.specialize("America/Detroit");
detroit(y2k, "%c");

hamtramck = detroit.specialize("pl_PL");
hamtramck(y2k, "%c");
