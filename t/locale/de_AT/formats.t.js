require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/de_AT'))

    // de_AT date representation
    assert(tz('2000-09-03', '%x', 'de_AT'), '2000-09-03', 'date format')

    // de_AT time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'de_AT'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'de_AT'), '23:05:04', 'long time format evening')

    // de_AT date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'de_AT'), 'Son 03 Sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'de_AT'), 'Son 03 Sep 2000 23:05:04 UTC', 'long date format evening')
})
