require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/pt_BR'))

    // pt_BR date representation
    assert(tz('2000-09-03', '%x', 'pt_BR'), '03-09-2000', 'date format')

    // pt_BR time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'pt_BR'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'pt_BR'), '23:05:04', 'long time format evening')

    // pt_BR date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'pt_BR'), 'Dom 03 Set 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'pt_BR'), 'Dom 03 Set 2000 23:05:04 UTC', 'long date format evening')
})
