require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/en_AU'))

    // en_AU date representation
    assert(tz('2000-09-03', '%x', 'en_AU'), '03/09/00', 'date format')

    // en_AU time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'en_AU'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'en_AU'), '23:05:04', 'long time format evening')

    // en_AU date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'en_AU'), 'Sun 03 Sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'en_AU'), 'Sun 03 Sep 2000 23:05:04 UTC', 'long date format evening')
})
