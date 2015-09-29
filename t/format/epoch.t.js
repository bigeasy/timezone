require('proof')(3, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.utc(1970, 0, 4, 5, 0, 1), '%s'), '277201', 'shortly after epoch')
    assert(tz(util.moonwalk, '%s'), '-14159040', 'moonwalk epoch')
    assert(tz(util.y2k, '%s'), '946684800', 'y2k epoch')
}
