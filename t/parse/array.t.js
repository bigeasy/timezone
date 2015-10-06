#!/usr/bin/env node

require("proof")(8, prove)

function prove (equal) {
    var tz = require('timezone'), util = require('../util')
    equal(tz([ 1980, 8, 18 ]), util.utc(1980, 7, 18), "year, month, date")
    equal(tz([ 1969, 7, 21, 2, 56 ]), util.moonwalk, "moonwalk")
    tz = tz(require("timezone/America/Detroit"))
    equal(tz([ 1969, 7, 20, 21, 56 ], "America/Detroit"), util.moonwalk, "moonwalk in Detroit")
    equal(typeof tz([ "X" ]), "function", "not an array date")
    equal(tz([ 0, "Yoiks!" ]), 0, "thinks you want to flatten this")
    equal(typeof tz([ 1970, 1, 1, 0, "X" ]), "function", "still not an array date")
    equal(tz([ 0 ]), 0, "POSIX time")
    equal(tz([ 1970, 1, 1 ]), 0, "year month")
}
