require('proof')(1, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    tz = tz(require('timezone/America/Detroit'), 'America/Detroit')
    assert(tz(util.utc(1980, 0, 1), 'America/Detroit', '%F %T'), '1979-12-31 19:00:00', 'convert from UTC to wallclock')
}
