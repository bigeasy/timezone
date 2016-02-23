require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/es_CO'))

    // es_CO date representation
    assert(tz('2000-09-03', '%x', 'es_CO'), '03/09/00', 'date format')

    // es_CO time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'es_CO'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'es_CO'), '23:05:04', 'long time format evening')

    // es_CO date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'es_CO'), 'dom 03 sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'es_CO'), 'dom 03 sep 2000 23:05:04 UTC', 'long date format evening')
})
