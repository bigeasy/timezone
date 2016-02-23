require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/he_IL'))

    // he_IL date representation
    assert(tz('2000-09-03', '%x', 'he_IL'), '03/09/00', 'date format')

    // he_IL time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'he_IL'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'he_IL'), '23:05:04', 'long time format evening')

    // he_IL date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'he_IL'), 'UTC 08:05:04 2000 ספט 03 א\'', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'he_IL'), 'UTC 23:05:04 2000 ספט 03 א\'', 'long date format evening')
})
