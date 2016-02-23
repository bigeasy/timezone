require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/he_IL'))

    // he_IL abbreviated days of week
    assert(tz('2006-01-01', '%a', 'he_IL'), 'א\'', 'Sun')
    assert(tz('2006-01-02', '%a', 'he_IL'), 'ב\'', 'Mon')
    assert(tz('2006-01-03', '%a', 'he_IL'), 'ג\'', 'Tue')
    assert(tz('2006-01-04', '%a', 'he_IL'), 'ד\'', 'Wed')
    assert(tz('2006-01-05', '%a', 'he_IL'), 'ה\'', 'Thu')
    assert(tz('2006-01-06', '%a', 'he_IL'), 'ו\'', 'Fri')
    assert(tz('2006-01-07', '%a', 'he_IL'), 'ש\'', 'Sat')

    // he_IL days of week
    assert(tz('2006-01-01', '%A', 'he_IL'), 'ראשון', 'Sunday')
    assert(tz('2006-01-02', '%A', 'he_IL'), 'שני', 'Monday')
    assert(tz('2006-01-03', '%A', 'he_IL'), 'שלישי', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'he_IL'), 'רביעי', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'he_IL'), 'חמישי', 'Thursday')
    assert(tz('2006-01-06', '%A', 'he_IL'), 'שישי', 'Friday')
    assert(tz('2006-01-07', '%A', 'he_IL'), 'שבת', 'Saturday')
})
