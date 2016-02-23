require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/si_LK'))

    // si_LK date representation
    assert(tz('2000-09-03', '%x', 'si_LK'), '2000-09-03', 'date format')

    // si_LK time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'si_LK'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'si_LK'), '23:05:04', 'long time format evening')

    // si_LK date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'si_LK'), '2000-09-03 08:05:04 +0000', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'si_LK'), '2000-09-03 23:05:04 +0000', 'long date format evening')
})
