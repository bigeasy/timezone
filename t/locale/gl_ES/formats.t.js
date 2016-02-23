require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/gl_ES'))

    // gl_ES date representation
    assert(tz('2000-09-03', '%x', 'gl_ES'), '03/09/00', 'date format')

    // gl_ES time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'gl_ES'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'gl_ES'), '23:05:04', 'long time format evening')

    // gl_ES date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'gl_ES'), 'Dom 03 Set 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'gl_ES'), 'Dom 03 Set 2000 23:05:04 UTC', 'long date format evening')
})
