require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/cs_CZ'))

    // cs_CZ abbreviated days of week
    assert(tz('2006-01-01', '%a', 'cs_CZ'), 'Ne', 'Sun')
    assert(tz('2006-01-02', '%a', 'cs_CZ'), 'Po', 'Mon')
    assert(tz('2006-01-03', '%a', 'cs_CZ'), 'Út', 'Tue')
    assert(tz('2006-01-04', '%a', 'cs_CZ'), 'St', 'Wed')
    assert(tz('2006-01-05', '%a', 'cs_CZ'), 'Čt', 'Thu')
    assert(tz('2006-01-06', '%a', 'cs_CZ'), 'Pá', 'Fri')
    assert(tz('2006-01-07', '%a', 'cs_CZ'), 'So', 'Sat')

    // cs_CZ days of week
    assert(tz('2006-01-01', '%A', 'cs_CZ'), 'Neděle', 'Sunday')
    assert(tz('2006-01-02', '%A', 'cs_CZ'), 'Pondělí', 'Monday')
    assert(tz('2006-01-03', '%A', 'cs_CZ'), 'Úterý', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'cs_CZ'), 'Středa', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'cs_CZ'), 'Čtvrtek', 'Thursday')
    assert(tz('2006-01-06', '%A', 'cs_CZ'), 'Pátek', 'Friday')
    assert(tz('2006-01-07', '%A', 'cs_CZ'), 'Sobota', 'Saturday')
})
