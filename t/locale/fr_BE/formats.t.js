require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/fr_BE'))

    // fr_BE date representation
    assert(tz('2000-09-03', '%x', 'fr_BE'), '03/09/00', 'date format')

    // fr_BE time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'fr_BE'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'fr_BE'), '23:05:04', 'long time format evening')

    // fr_BE date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'fr_BE'), 'dim 03 sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'fr_BE'), 'dim 03 sep 2000 23:05:04 UTC', 'long date format evening')
})
