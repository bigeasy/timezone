require('proof')(2, prove)

function prove (assert) {
    var tz = require('timezone')
    var detroit = tz(require('timezone/America/Detroit'), 'America/Detroit')
    assert(detroit(Date.UTC(2000, 0, 1), '%m/%d/%Y %H:%M'), '12/31/1999 19:00', 'timezone')
    var detroit = detroit('%m/%d/%Y %H:%M')
    assert(detroit(Date.UTC(2000, 0, 1)), '12/31/1999 19:00', 'format and timezone')
}
