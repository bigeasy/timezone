require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/es_EC'))

    // es_EC date representation
    assert(tz('2000-09-03', '%x', 'es_EC'), '03/09/00', 'date format')

    // es_EC time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'es_EC'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'es_EC'), '23:05:04', 'long time format evening')

    // es_EC date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'es_EC'), 'dom 03 sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'es_EC'), 'dom 03 sep 2000 23:05:04 UTC', 'long date format evening')
})
