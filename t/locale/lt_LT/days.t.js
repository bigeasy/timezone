require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/lt_LT'))

    // lt_LT abbreviated days of week
    assert(tz('2006-01-01', '%a', 'lt_LT'), 'Sk', 'Sun')
    assert(tz('2006-01-02', '%a', 'lt_LT'), 'Pr', 'Mon')
    assert(tz('2006-01-03', '%a', 'lt_LT'), 'An', 'Tue')
    assert(tz('2006-01-04', '%a', 'lt_LT'), 'Tr', 'Wed')
    assert(tz('2006-01-05', '%a', 'lt_LT'), 'Kt', 'Thu')
    assert(tz('2006-01-06', '%a', 'lt_LT'), 'Pn', 'Fri')
    assert(tz('2006-01-07', '%a', 'lt_LT'), 'Št', 'Sat')

    // lt_LT days of week
    assert(tz('2006-01-01', '%A', 'lt_LT'), 'Sekmadienis', 'Sunday')
    assert(tz('2006-01-02', '%A', 'lt_LT'), 'Pirmadienis', 'Monday')
    assert(tz('2006-01-03', '%A', 'lt_LT'), 'Antradienis', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'lt_LT'), 'Trečiadienis', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'lt_LT'), 'Ketvirtadienis', 'Thursday')
    assert(tz('2006-01-06', '%A', 'lt_LT'), 'Penktadienis', 'Friday')
    assert(tz('2006-01-07', '%A', 'lt_LT'), 'Šeštadienis', 'Saturday')
})
