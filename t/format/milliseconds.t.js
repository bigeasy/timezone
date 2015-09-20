#!/usr/bin/env node

require('proof')(3, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.utc(1980, 0, 1, 0, 0, 1, 1000), '%3N'), '000', 'top of hour')
    assert(tz(util.utc(1980, 0, 1, 0, 0, 1, 999), '%3N'), '999', 'last millisecond')
    assert(tz(util.utc(1980, 0, 1, 0, 0, 1, 3), '%0003N'), '003', 'padded')
}
