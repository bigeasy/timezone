require('proof')(1, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.bicentennial, '%C'), '19', 'century')
}
