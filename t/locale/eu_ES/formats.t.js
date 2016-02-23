require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/eu_ES'))

    // eu_ES date representation
    assert(tz('2000-09-03', '%x', 'eu_ES'), 'ig., 2000.eko iraren 03a', 'date format')

    // eu_ES time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'eu_ES'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'eu_ES'), '23:05:04', 'long time format evening')

    // eu_ES date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'eu_ES'), '00-09-03 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'eu_ES'), '00-09-03 23:05:04 UTC', 'long date format evening')
})
