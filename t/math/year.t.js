#!/usr/bin/env node

require('proof')(4, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.moonwalk, '+2 years'), util.utc(1971, 6, 21, 2, 56), 'add years')
    assert(tz(util.moonwalk, '-2 years'), util.utc(1967, 6, 21, 2, 56), 'subtract years across leap year')
    assert(tz(util.utc(1980, 1, 29, 12), '+1 year'), util.utc(1981, 2, 1, 12), 'add years from leap day')
    assert(tz(util.utc(1980, 1, 29, 12), '-1 year'), util.utc(1979, 2, 1, 12), 'subtract years from leap day')
}
