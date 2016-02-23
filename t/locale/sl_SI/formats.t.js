require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/sl_SI'))

    // sl_SI date representation
    assert(tz('2000-09-03', '%x', 'sl_SI'), '03. 09. 2000', 'date format')

    // sl_SI time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'sl_SI'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'sl_SI'), '23:05:04', 'long time format evening')

    // sl_SI date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'sl_SI'), 'ned 03 sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'sl_SI'), 'ned 03 sep 2000 23:05:04 UTC', 'long date format evening')
})
