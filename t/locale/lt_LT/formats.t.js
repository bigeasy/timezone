require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/lt_LT'))

    // lt_LT date representation
    assert(tz('2000-09-03', '%x', 'lt_LT'), '2000.09.03', 'date format')

    // lt_LT time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'lt_LT'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'lt_LT'), '23:05:04', 'long time format evening')

    // lt_LT date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'lt_LT'), '2000 m. rugsėjo 03 d. 08:05:04', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'lt_LT'), '2000 m. rugsėjo 03 d. 23:05:04', 'long date format evening')
})
