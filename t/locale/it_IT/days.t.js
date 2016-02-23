require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/it_IT'))

    // it_IT abbreviated days of week
    assert(tz('2006-01-01', '%a', 'it_IT'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'it_IT'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'it_IT'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'it_IT'), 'mer', 'Wed')
    assert(tz('2006-01-05', '%a', 'it_IT'), 'gio', 'Thu')
    assert(tz('2006-01-06', '%a', 'it_IT'), 'ven', 'Fri')
    assert(tz('2006-01-07', '%a', 'it_IT'), 'sab', 'Sat')

    // it_IT days of week
    assert(tz('2006-01-01', '%A', 'it_IT'), 'domenica', 'Sunday')
    assert(tz('2006-01-02', '%A', 'it_IT'), 'lunedì', 'Monday')
    assert(tz('2006-01-03', '%A', 'it_IT'), 'martedì', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'it_IT'), 'mercoledì', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'it_IT'), 'giovedì', 'Thursday')
    assert(tz('2006-01-06', '%A', 'it_IT'), 'venerdì', 'Friday')
    assert(tz('2006-01-07', '%A', 'it_IT'), 'sabato', 'Saturday')
})
