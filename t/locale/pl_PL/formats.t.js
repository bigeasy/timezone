require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/pl_PL'))

    // pl_PL date representation
    assert(tz('2000-09-03', '%x', 'pl_PL'), '03.09.2000', 'date format')

    // pl_PL time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'pl_PL'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'pl_PL'), '23:05:04', 'long time format evening')

    // pl_PL date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'pl_PL'), 'nie, 3 wrz 2000, 08:05:04', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'pl_PL'), 'nie, 3 wrz 2000, 23:05:04', 'long date format evening')
})
