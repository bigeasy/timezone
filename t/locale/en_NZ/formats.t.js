require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/en_NZ'))

    // en_NZ date representation
    assert(tz('2000-09-03', '%x', 'en_NZ'), '03/09/00', 'date format')

    // en_NZ time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'en_NZ'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'en_NZ'), '23:05:04', 'long time format evening')

    // en_NZ date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'en_NZ'), 'Sun 03 Sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'en_NZ'), 'Sun 03 Sep 2000 23:05:04 UTC', 'long date format evening')
})
