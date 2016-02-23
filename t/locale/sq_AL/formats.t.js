require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/sq_AL'))

    // sq_AL date representation
    assert(tz('2000-09-03', '%x', 'sq_AL'), '2000-Sht-03', 'date format')

    // sq_AL time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'sq_AL'), '08.05.04. UTC', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'sq_AL'), '11.05.04. UTC', 'long time format evening')

    // sq_AL date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'sq_AL'), '2000-Sht-03 08.05.04.PD UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'sq_AL'), '2000-Sht-03 11.05.04.MD UTC', 'long date format evening')
})
