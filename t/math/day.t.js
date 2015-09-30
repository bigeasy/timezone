require('proof')(6, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.utc(2007, 2, 3), '-1 day'), util.utc(2007, 2, 2), 'subtract day')
    assert(tz(util.utc(2007, 3, 1), '-1 day'), util.utc(2007, 2, 31), 'subtract day across month')
    assert(tz(util.utc(2007, 0, 1), '-1 day'), util.utc(2006, 11, 31), 'subtract day across year')
    assert(tz(util.utc(2007, 2, 3), '+1 day'), util.utc(2007, 2, 4), 'add day')
    assert(tz(util.utc(2007, 2, 3), '+09 day'), util.utc(2007, 2, 12), 'add nine days with leading zero')
    assert(tz(util.utc(2007, 2, 31), '+366 day'), util.utc(2008, 2, 31), 'add day across month')
}
