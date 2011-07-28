// Import tz function and initialize.
var tz = require("tz").tz;
tz.timezones(require("./zones/northamerica"));

var equal = require("assert").equal;

// Parse a UTC date.
y2k = tz("2000/01/01");
equal(y2k, Date.UTC(2000, 0, 1));

// Parse a date offset by a time zone.
bicentenial = tz("1976/07/04", "America/Detroit", "%c");

// Date math accounting for daylight savings time.
ago = tz("6 months ago", "America/Detroit");

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
detroit = tz.curry("America/Detroit");
detroit(y2k, "%c");

hamtramck = detroit.curry("pl_PL");
hamtramck(y2k, "%c");
