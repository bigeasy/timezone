require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/en_HK'))

    // en_HK abbreviated days of week
    assert(tz('2006-01-01', '%a', 'en_HK'), 'Sun', 'Sun')
    assert(tz('2006-01-02', '%a', 'en_HK'), 'Mon', 'Mon')
    assert(tz('2006-01-03', '%a', 'en_HK'), 'Tue', 'Tue')
    assert(tz('2006-01-04', '%a', 'en_HK'), 'Wed', 'Wed')
    assert(tz('2006-01-05', '%a', 'en_HK'), 'Thu', 'Thu')
    assert(tz('2006-01-06', '%a', 'en_HK'), 'Fri', 'Fri')
    assert(tz('2006-01-07', '%a', 'en_HK'), 'Sat', 'Sat')

    // en_HK days of week
    assert(tz('2006-01-01', '%A', 'en_HK'), 'Sunday', 'Sunday')
    assert(tz('2006-01-02', '%A', 'en_HK'), 'Monday', 'Monday')
    assert(tz('2006-01-03', '%A', 'en_HK'), 'Tuesday', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'en_HK'), 'Wednesday', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'en_HK'), 'Thursday', 'Thursday')
    assert(tz('2006-01-06', '%A', 'en_HK'), 'Friday', 'Friday')
    assert(tz('2006-01-07', '%A', 'en_HK'), 'Saturday', 'Saturday')
})
