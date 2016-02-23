require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/es_PR'))

    // es_PR date representation
    assert(tz('2000-09-03', '%x', 'es_PR'), '03/09/00', 'date format')

    // es_PR time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'es_PR'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'es_PR'), '23:05:04', 'long time format evening')

    // es_PR date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'es_PR'), 'dom 03 sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'es_PR'), 'dom 03 sep 2000 23:05:04 UTC', 'long date format evening')
})
