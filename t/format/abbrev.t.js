require('proof')(1, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    tz = tz(require('timezone/America/Anchorage'))
    assert(tz(util.utc(1946, 0, 1, 10), '%Z', 'America/Anchorage'), 'AST', 'standard')
}
