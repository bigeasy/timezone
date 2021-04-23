require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/ms_MY'))

    // ms_MY date representation
    assert(tz('2000-09-03', '%x', 'ms_MY'), 'Ahad 03 Sep 2000', 'date format')

    // ms_MY time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'ms_MY'), '08:05:04  UTC', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'ms_MY'), '11:05:04  UTC', 'long time format evening')

    // ms_MY date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'ms_MY'), 'Ahad 03 Sep 2000 08:05:04 AM UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'ms_MY'), 'Ahad 03 Sep 2000 11:05:04 PM UTC', 'long date format evening')
})
