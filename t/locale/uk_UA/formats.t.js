require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/uk_UA'))

    // uk_UA date representation
    assert(tz('2000-09-03', '%x', 'uk_UA'), '03.09.00', 'date format')

    // uk_UA time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'uk_UA'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'uk_UA'), '23:05:04', 'long time format evening')

    // uk_UA date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'uk_UA'), 'нд, 03-вер-2000 08:05:04 +0000', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'uk_UA'), 'нд, 03-вер-2000 23:05:04 +0000', 'long date format evening')
})
