require('proof')(1, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz('2011-10-01', '-1 day', '+2 saturday', '%F %T%^z'), '2011-10-08 00:00:00Z', 'substract by day of week')
}
