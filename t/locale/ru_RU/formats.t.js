require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/ru_RU'))

    // ru_RU date representation
    assert(tz('2000-09-03', '%x', 'ru_RU'), '03.09.2000', 'date format')

    // ru_RU time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'ru_RU'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'ru_RU'), '23:05:04', 'long time format evening')

    // ru_RU date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'ru_RU'), 'Вс. 03 сент. 2000 08:05:04', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'ru_RU'), 'Вс. 03 сент. 2000 23:05:04', 'long date format evening')
})
