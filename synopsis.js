var eq = require("assert").equal;
var tz = require("./lib/timezone").tz;

tz.timezones(require("./test/data/northamerica"));

eq(946684800000, tz("2000/1/1"));

y2k = tz("2000/1/1")
eq("01/01/2000 00:00:00", tz(y2k, "%m/%d/%Y %H:%M:%S"))
eq("12/31/1999 19:00:00", tz(y2k, "%m/%d/%Y %H:%M:%S", "America/Detroit"))
