require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/nl_NL'))

    // nl_NL date representation
    assert(tz('2000-09-03', '%x', 'nl_NL'), '03-09-00', 'date format')

    // nl_NL time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'nl_NL'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'nl_NL'), '23:05:04', 'long time format evening')

    // nl_NL date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'nl_NL'), 'zo 03 sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'nl_NL'), 'zo 03 sep 2000 23:05:04 UTC', 'long date format evening')
})
