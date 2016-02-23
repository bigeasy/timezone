require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/fr_CH'))

    // fr_CH date representation
    assert(tz('2000-09-03', '%x', 'fr_CH'), '03. 09. 00', 'date format')

    // fr_CH time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'fr_CH'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'fr_CH'), '23:05:04', 'long time format evening')

    // fr_CH date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'fr_CH'), 'dim 03 sep 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'fr_CH'), 'dim 03 sep 2000 23:05:04 UTC', 'long date format evening')
})
