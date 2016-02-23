require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/uk_UA'))

    // uk_UA abbreviated days of week
    assert(tz('2006-01-01', '%a', 'uk_UA'), 'нд', 'Sun')
    assert(tz('2006-01-02', '%a', 'uk_UA'), 'пн', 'Mon')
    assert(tz('2006-01-03', '%a', 'uk_UA'), 'вт', 'Tue')
    assert(tz('2006-01-04', '%a', 'uk_UA'), 'ср', 'Wed')
    assert(tz('2006-01-05', '%a', 'uk_UA'), 'чт', 'Thu')
    assert(tz('2006-01-06', '%a', 'uk_UA'), 'пт', 'Fri')
    assert(tz('2006-01-07', '%a', 'uk_UA'), 'сб', 'Sat')

    // uk_UA days of week
    assert(tz('2006-01-01', '%A', 'uk_UA'), 'неділя', 'Sunday')
    assert(tz('2006-01-02', '%A', 'uk_UA'), 'понеділок', 'Monday')
    assert(tz('2006-01-03', '%A', 'uk_UA'), 'вівторок', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'uk_UA'), 'середа', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'uk_UA'), 'четвер', 'Thursday')
    assert(tz('2006-01-06', '%A', 'uk_UA'), 'п\'ятниця', 'Friday')
    assert(tz('2006-01-07', '%A', 'uk_UA'), 'субота', 'Saturday')
})
