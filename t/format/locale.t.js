require('proof')(4, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.bicentennial, '%x'), '07/04/1976', 'locale date format')
    assert(tz(util.moonwalk, '%X'), '02:56:00 AM', 'locale time format')
    assert(tz(util.moonwalk, '%c'), 'Mon 21 Jul 1969 02:56:00 AM UTC', 'locale time and date, padding apparent')
    assert(tz(util.y2k, '%c'), 'Sat 01 Jan 2000 12:00:00 AM UTC', 'locale time and date')
}
