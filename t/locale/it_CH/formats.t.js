require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/it_CH'))

    // it_CH date representation
    assert(tz('2000-09-03', '%x', 'it_CH'), '03. 09. 00', 'date format')

    // it_CH time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'it_CH'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'it_CH'), '23:05:04', 'long time format evening')

    // it_CH date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'it_CH'), 'dom 03 set 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'it_CH'), 'dom 03 set 2000 23:05:04 UTC', 'long date format evening')
})
