require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/ca_ES'))

    // ca_ES date representation
    assert(tz('2000-09-03', '%x', 'ca_ES'), '03/09/00', 'date format')

    // ca_ES time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'ca_ES'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'ca_ES'), '23:05:04', 'long time format evening')

    // ca_ES date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'ca_ES'), 'dg 03 set 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'ca_ES'), 'dg 03 set 2000 23:05:04 UTC', 'long date format evening')
})
