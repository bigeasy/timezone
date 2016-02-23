require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/hu_HU'))

    // hu_HU date representation
    assert(tz('2000-09-03', '%x', 'hu_HU'), '2000-09-03', 'date format')

    // hu_HU time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'hu_HU'), '08.05.04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'hu_HU'), '23.05.04', 'long time format evening')

    // hu_HU date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'hu_HU'), '2000. szept.  3., vasárnap, 08.05.04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'hu_HU'), '2000. szept.  3., vasárnap, 23.05.04 UTC', 'long date format evening')
})
