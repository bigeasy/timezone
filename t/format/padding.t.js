#!/usr/bin/env node

require('proof')(3, prove)

function prove (equal) {
    var tz = require('timezone'), util = require('../util')
    equal(tz(util.utc(1980, 0, 1, 0, 0, 1, 3), '%0003N'), '003', 'padded')
    equal(tz(util.utc(1980, 0, 1, 0, 0, 1, 3), '%_3N'), '  3', 'space padded')
    equal(tz(util.utc(1980, 0, 1), '%-d'), '1', 'unpadded')
}
