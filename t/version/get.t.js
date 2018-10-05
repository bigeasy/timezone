require('proof')(1, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(), '1.0.18', 'get')
}
