#!/usr/bin/env node

require('proof')(4, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.bicentennial, '%d'), '04', 'date')
    assert(tz(util.bicentennial, '%-d'), '4', 'date unpadded')
    assert(tz(util.bicentennial, '%_d'), ' 4', 'date space padded')
    assert(tz(util.bicentennial, '%e'), ' 4', 'date single digit')
}
