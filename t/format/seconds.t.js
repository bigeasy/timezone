#!/usr/bin/env node

require('proof')(3, prove)

function prove (equal, tz, moonwalk, utc) {
    var tz = require('timezone'), util = require('../util')
    equal(tz(util.utc(1980, 0, 1, 0, 0, 1), '%S'), '01', 'second')
    equal(tz(util.moonwalk, '%S'), '00', 'top of minute')
    equal(tz(util.utc(1980, 0, 1, 0, 0, 59), '%S'), '59', 'last second')
}
