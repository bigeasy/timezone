#!/usr/bin/env node
require('proof')(29, function (assert) {
    var tz = require('timezone'), util = require('../util')
    // Month digits.
    assert(tz(util.moonwalk, "%m"), "07", "two digit july")
    assert(tz(util.y2k, "%m"), "01", "two digit january")

    // Abbreviated month.
    assert(tz(util.moonwalk, "%h"), "Jul", "abbreviation")
    assert(tz(util.moonwalk, "%b"), "Jul", "locale abbreviation")
    assert(tz(util.utc(1980, 0, 1), "%b"), "Jan", "locale abbreviation January")
    assert(tz(util.utc(1980, 1, 1), "%b"), "Feb", "locale abbreviation February")
    assert(tz(util.utc(1980, 2, 1), "%b"), "Mar", "locale abbreviation March")
    assert(tz(util.utc(1980, 3, 1), "%b"), "Apr", "locale abbreviation April")
    assert(tz(util.utc(1980, 4, 1), "%b"), "May", "locale abbreviation May")
    assert(tz(util.utc(1980, 5, 1), "%b"), "Jun", "locale abbreviation June")
    assert(tz(util.utc(1980, 6, 1), "%b"), "Jul", "locale abbreviation July")
    assert(tz(util.utc(1980, 7, 1), "%b"), "Aug", "locale abbreviation August")
    assert(tz(util.utc(1980, 8, 1), "%b"), "Sep", "locale abbreviation September")
    assert(tz(util.utc(1980, 9, 1), "%b"), "Oct", "locale abbreviation October")
    assert(tz(util.utc(1980, 10, 1), "%b"), "Nov", "locale abbreviation November")
    assert(tz(util.utc(1980, 11, 1), "%b"), "Dec", "locale abbreviation December")

    // Full month.
    assert(tz(util.moonwalk, "%B"), "July", "locale full")
    assert(tz(util.utc(1980, 0, 1), "%B"), "January", "locale full January")
    assert(tz(util.utc(1980, 1, 1), "%B"), "February", "locale full February")
    assert(tz(util.utc(1980, 2, 1), "%B"), "March", "locale full March")
    assert(tz(util.utc(1980, 3, 1), "%B"), "April", "locale full April")
    assert(tz(util.utc(1980, 4, 1), "%B"), "May", "locale full May")
    assert(tz(util.utc(1980, 5, 1), "%B"), "June", "locale full June")
    assert(tz(util.utc(1980, 6, 1), "%B"), "July", "locale full July")
    assert(tz(util.utc(1980, 7, 1), "%B"), "August", "locale full August")
    assert(tz(util.utc(1980, 8, 1), "%B"), "September", "locale full September")
    assert(tz(util.utc(1980, 9, 1), "%B"), "October", "locale full October")
    assert(tz(util.utc(1980, 10, 1), "%B"), "November", "locale full November")
    assert(tz(util.utc(1980, 11, 1), "%B"), "December", "locale full December")
})
