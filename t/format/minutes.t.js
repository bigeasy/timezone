#!/usr/bin/env node

require('proof')(3, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.utc(2011, 0, 1, 0, 0), '%M'), '00', 'top of hour')
    assert(tz(util.utc(2011, 0, 1, 0, 1), '%M'), '01', 'minutes')
    assert(tz(util.utc(2011, 0, 1, 0, 59), '%M'), '59', 'last minute')
}
