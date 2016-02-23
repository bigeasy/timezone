require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/bg_BG'))

    // bg_BG date representation
    assert(tz('2000-09-03', '%x', 'bg_BG'), ' 3.09.2000', 'date format')

    // bg_BG time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'bg_BG'), ' 8,05,04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'bg_BG'), '23,05,04', 'long time format evening')

    // bg_BG date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'bg_BG'), ' 3.09.2000 (нд)  8,05,04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'bg_BG'), ' 3.09.2000 (нд) 23,05,04 UTC', 'long date format evening')
})
