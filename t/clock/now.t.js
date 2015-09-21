require('proof')(1, prove)

function prove (assert) {
    var tz = require('timezone')(function () { this.clock = function () { return 0 } })
    assert(tz('*'), 0, 'set')
}
