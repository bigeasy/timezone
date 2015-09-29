#!/usr/bin/env node

require('proof')(9, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.y2k, '%j'), '001', 'day of year y2k')
    assert(tz(util.moonwalk, '%j'), '202', 'day of year moonwalk')
    assert(tz(util.bicentennial, '%j'), '186', 'day of year bicentenial')
    assert(tz(util.y2k, '%u'), '6', 'day of week starting monday y2k')
    assert(tz(util.moonwalk, '%u'), '1', 'day of week starting monday moonwalk')
    assert(tz(util.bicentennial, '%u'), '7', 'day of week starting monday bicentenial')
    assert(tz(util.y2k, '%w'), '6', 'day of week starting sunday y2k')
    assert(tz(util.moonwalk, '%w'), '1', 'day of week starting sunday moonwalk')
    assert(tz(util.bicentennial, '%w'), '0', 'day of week starting sunday bicentenial')
}
