require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/si_LK'))

    // si_LK abbreviated days of week
    assert(tz('2006-01-01', '%a', 'si_LK'), 'ඉ', 'Sun')
    assert(tz('2006-01-02', '%a', 'si_LK'), 'ස', 'Mon')
    assert(tz('2006-01-03', '%a', 'si_LK'), 'අ', 'Tue')
    assert(tz('2006-01-04', '%a', 'si_LK'), 'බ', 'Wed')
    assert(tz('2006-01-05', '%a', 'si_LK'), 'බ්‍ර', 'Thu')
    assert(tz('2006-01-06', '%a', 'si_LK'), 'සි', 'Fri')
    assert(tz('2006-01-07', '%a', 'si_LK'), 'සෙ', 'Sat')

    // si_LK days of week
    assert(tz('2006-01-01', '%A', 'si_LK'), 'ඉරිදා', 'Sunday')
    assert(tz('2006-01-02', '%A', 'si_LK'), 'සඳුදා', 'Monday')
    assert(tz('2006-01-03', '%A', 'si_LK'), 'අඟහරුවාදා', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'si_LK'), 'බදාදා', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'si_LK'), 'බ්‍රහස්පතින්දා', 'Thursday')
    assert(tz('2006-01-06', '%A', 'si_LK'), 'සිකුරාදා', 'Friday')
    assert(tz('2006-01-07', '%A', 'si_LK'), 'සෙනසුරාදා', 'Saturday')
})
