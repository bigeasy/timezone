require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/hr_HR'))

    // hr_HR date representation
    assert(tz('2000-09-03', '%x', 'hr_HR'), '03.09.2000', 'date format')

    // hr_HR time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'hr_HR'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'hr_HR'), '23:05:04', 'long time format evening')

    // hr_HR date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'hr_HR'), 'Ned 03 Ruj 2000 08:05:04', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'hr_HR'), 'Ned 03 Ruj 2000 23:05:04', 'long date format evening')
})
