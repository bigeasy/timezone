#!/usr/bin/env node

require('proof')(3, prove)

function prove (equal, tz, bicentennial) {
    var tz = require('timezone'), util = require('../util')
    equal(tz(util.bicentennial, '%%'), '%', 'escaped percent sign')
    equal(tz(util.bicentennial, '%%%d%'), '%04%', 'percents front')
    equal(tz(util.bicentennial, '%%%d%%'), '%04%', 'percents front and back')
}
