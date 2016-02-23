require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/am_ET'))

    // am_ET abbreviated days of week
    assert(tz('2006-01-01', '%a', 'am_ET'), 'እሑድ', 'Sun')
    assert(tz('2006-01-02', '%a', 'am_ET'), 'ሰኞ ', 'Mon')
    assert(tz('2006-01-03', '%a', 'am_ET'), 'ማክሰ', 'Tue')
    assert(tz('2006-01-04', '%a', 'am_ET'), 'ረቡዕ', 'Wed')
    assert(tz('2006-01-05', '%a', 'am_ET'), 'ሐሙስ', 'Thu')
    assert(tz('2006-01-06', '%a', 'am_ET'), 'ዓርብ', 'Fri')
    assert(tz('2006-01-07', '%a', 'am_ET'), 'ቅዳሜ', 'Sat')

    // am_ET days of week
    assert(tz('2006-01-01', '%A', 'am_ET'), 'እሑድ', 'Sunday')
    assert(tz('2006-01-02', '%A', 'am_ET'), 'ሰኞ', 'Monday')
    assert(tz('2006-01-03', '%A', 'am_ET'), 'ማክሰኞ', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'am_ET'), 'ረቡዕ', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'am_ET'), 'ሐሙስ', 'Thursday')
    assert(tz('2006-01-06', '%A', 'am_ET'), 'ዓርብ', 'Friday')
    assert(tz('2006-01-07', '%A', 'am_ET'), 'ቅዳሜ', 'Saturday')
})
