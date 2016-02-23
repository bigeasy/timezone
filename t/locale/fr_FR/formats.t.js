require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/fr_FR'))

    // fr_FR date representation
    assert(tz('2000-09-03', '%x', 'fr_FR'), '03/09/2000', 'date format')

    // fr_FR time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'fr_FR'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'fr_FR'), '23:05:04', 'long time format evening')

    // fr_FR date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'fr_FR'), 'dim. 03 sept. 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'fr_FR'), 'dim. 03 sept. 2000 23:05:04 UTC', 'long date format evening')
})
