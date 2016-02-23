require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/bg_BG'))

    // bg_BG abbreviated days of week
    assert(tz('2006-01-01', '%a', 'bg_BG'), 'нд', 'Sun')
    assert(tz('2006-01-02', '%a', 'bg_BG'), 'пн', 'Mon')
    assert(tz('2006-01-03', '%a', 'bg_BG'), 'вт', 'Tue')
    assert(tz('2006-01-04', '%a', 'bg_BG'), 'ср', 'Wed')
    assert(tz('2006-01-05', '%a', 'bg_BG'), 'чт', 'Thu')
    assert(tz('2006-01-06', '%a', 'bg_BG'), 'пт', 'Fri')
    assert(tz('2006-01-07', '%a', 'bg_BG'), 'сб', 'Sat')

    // bg_BG days of week
    assert(tz('2006-01-01', '%A', 'bg_BG'), 'неделя', 'Sunday')
    assert(tz('2006-01-02', '%A', 'bg_BG'), 'понеделник', 'Monday')
    assert(tz('2006-01-03', '%A', 'bg_BG'), 'вторник', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'bg_BG'), 'сряда', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'bg_BG'), 'четвъртък', 'Thursday')
    assert(tz('2006-01-06', '%A', 'bg_BG'), 'петък', 'Friday')
    assert(tz('2006-01-07', '%A', 'bg_BG'), 'събота', 'Saturday')
})
