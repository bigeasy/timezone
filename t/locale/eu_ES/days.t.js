require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/eu_ES'))

    // eu_ES abbreviated days of week
    assert(tz('2006-01-01', '%a', 'eu_ES'), 'ig.', 'Sun')
    assert(tz('2006-01-02', '%a', 'eu_ES'), 'al.', 'Mon')
    assert(tz('2006-01-03', '%a', 'eu_ES'), 'ar.', 'Tue')
    assert(tz('2006-01-04', '%a', 'eu_ES'), 'az.', 'Wed')
    assert(tz('2006-01-05', '%a', 'eu_ES'), 'og.', 'Thu')
    assert(tz('2006-01-06', '%a', 'eu_ES'), 'or.', 'Fri')
    assert(tz('2006-01-07', '%a', 'eu_ES'), 'lr.', 'Sat')

    // eu_ES days of week
    assert(tz('2006-01-01', '%A', 'eu_ES'), 'igandea', 'Sunday')
    assert(tz('2006-01-02', '%A', 'eu_ES'), 'astelehena', 'Monday')
    assert(tz('2006-01-03', '%A', 'eu_ES'), 'asteartea', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'eu_ES'), 'asteazkena', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'eu_ES'), 'osteguna', 'Thursday')
    assert(tz('2006-01-06', '%A', 'eu_ES'), 'ostirala', 'Friday')
    assert(tz('2006-01-07', '%A', 'eu_ES'), 'larunbata', 'Saturday')
})
