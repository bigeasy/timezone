require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/ur_PK'))

    // ur_PK date representation
    assert(tz('2000-09-03', '%x', 'ur_PK'), '03/09/2000', 'date format')

    // ur_PK time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'ur_PK'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'ur_PK'), '23:05:04', 'long time format evening')

    // ur_PK date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'ur_PK'), 'و 08:05:04 UTC ت 03 ستمبر 2000', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'ur_PK'), 'و 23:05:04 UTC ت 03 ستمبر 2000', 'long date format evening')
})
