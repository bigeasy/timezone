require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/nds_DE'))

    // nds_DE date representation
    assert(tz('2000-09-03', '%x', 'nds_DE'), '03.09.2000', 'date format')

    // nds_DE time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'nds_DE'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'nds_DE'), '23:05:04', 'long time format evening')

    // nds_DE date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'nds_DE'), 'Sdag 03. Sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'nds_DE'), 'Sdag 03. Sep 2000 23:05:04 UTC', 'long date format evening')
})
