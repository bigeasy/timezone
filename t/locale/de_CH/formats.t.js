require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/de_CH'))

    // de_CH date representation
    assert(tz('2000-09-03', '%x', 'de_CH'), '03.09.2000', 'date format')

    // de_CH time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'de_CH'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'de_CH'), '23:05:04', 'long time format evening')

    // de_CH date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'de_CH'), 'Son 03 Sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'de_CH'), 'Son 03 Sep 2000 23:05:04 UTC', 'long date format evening')
})
