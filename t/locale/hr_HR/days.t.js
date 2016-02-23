require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/hr_HR'))

    // hr_HR abbreviated days of week
    assert(tz('2006-01-01', '%a', 'hr_HR'), 'Ned', 'Sun')
    assert(tz('2006-01-02', '%a', 'hr_HR'), 'Pon', 'Mon')
    assert(tz('2006-01-03', '%a', 'hr_HR'), 'Uto', 'Tue')
    assert(tz('2006-01-04', '%a', 'hr_HR'), 'Sri', 'Wed')
    assert(tz('2006-01-05', '%a', 'hr_HR'), 'Čet', 'Thu')
    assert(tz('2006-01-06', '%a', 'hr_HR'), 'Pet', 'Fri')
    assert(tz('2006-01-07', '%a', 'hr_HR'), 'Sub', 'Sat')

    // hr_HR days of week
    assert(tz('2006-01-01', '%A', 'hr_HR'), 'Nedjelja', 'Sunday')
    assert(tz('2006-01-02', '%A', 'hr_HR'), 'Ponedjeljak', 'Monday')
    assert(tz('2006-01-03', '%A', 'hr_HR'), 'Utorak', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'hr_HR'), 'Srijeda', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'hr_HR'), 'Četvrtak', 'Thursday')
    assert(tz('2006-01-06', '%A', 'hr_HR'), 'Petak', 'Friday')
    assert(tz('2006-01-07', '%A', 'hr_HR'), 'Subota', 'Saturday')
})
