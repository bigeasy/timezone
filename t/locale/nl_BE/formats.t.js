require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/nl_BE'))

    // nl_BE date representation
    assert(tz('2000-09-03', '%x', 'nl_BE'), '03-09-00', 'date format')

    // nl_BE time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'nl_BE'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'nl_BE'), '23:05:04', 'long time format evening')

    // nl_BE date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'nl_BE'), 'zo 03 sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'nl_BE'), 'zo 03 sep 2000 23:05:04 UTC', 'long date format evening')
})
