require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/ms_MY'))

    // ms_MY abbreviated days of week
    assert(tz('2006-01-01', '%a', 'ms_MY'), 'Ahd', 'Sun')
    assert(tz('2006-01-02', '%a', 'ms_MY'), 'Isn', 'Mon')
    assert(tz('2006-01-03', '%a', 'ms_MY'), 'Sel', 'Tue')
    assert(tz('2006-01-04', '%a', 'ms_MY'), 'Rab', 'Wed')
    assert(tz('2006-01-05', '%a', 'ms_MY'), 'Kha', 'Thu')
    assert(tz('2006-01-06', '%a', 'ms_MY'), 'Jum', 'Fri')
    assert(tz('2006-01-07', '%a', 'ms_MY'), 'Sab', 'Sat')

    // ms_MY days of week
    assert(tz('2006-01-01', '%A', 'ms_MY'), 'Ahad', 'Sunday')
    assert(tz('2006-01-02', '%A', 'ms_MY'), 'Isnin', 'Monday')
    assert(tz('2006-01-03', '%A', 'ms_MY'), 'Selasa', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'ms_MY'), 'Rabu', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'ms_MY'), 'Khamis', 'Thursday')
    assert(tz('2006-01-06', '%A', 'ms_MY'), 'Jumaat', 'Friday')
    assert(tz('2006-01-07', '%A', 'ms_MY'), 'Sabtu', 'Saturday')
})
