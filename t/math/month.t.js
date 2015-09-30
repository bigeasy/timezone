require('proof')(3, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.utc(2007, 2, 3), '+1 month'), util.utc(2007, 3, 3), 'add month')
    assert(tz(util.utc(2011, 10), '-1 month'), util.utc(2011, 9), 'subtract month')
    assert(tz(util.utc(2007, 11, 3), '+1 month'), util.utc(2008, 0, 3), 'add month across year')
}
