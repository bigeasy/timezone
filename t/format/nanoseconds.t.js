require('proof')(4, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.y2k, '%N'), '000000000', 'top of hour')
    assert(tz(util.utc(1980, 0, 1, 0, 0, 1, 999), '%N'), '999000000', 'last millisecond')
    assert(tz(util.utc(1980, 0, 1, 0, 0, 1, 3), '%N'), '003000000', 'nanoseconds')
    assert(tz(util.utc(1969, 0, 1, 0, 0, 1, 42), '%N'), '042000000', 'ns from negative')
}
