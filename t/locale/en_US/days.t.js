require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/en_US'))

    // en_US abbreviated days of week
    assert(tz('2006-01-01', '%a', 'en_US'), 'Sun', 'Sun')
    assert(tz('2006-01-02', '%a', 'en_US'), 'Mon', 'Mon')
    assert(tz('2006-01-03', '%a', 'en_US'), 'Tue', 'Tue')
    assert(tz('2006-01-04', '%a', 'en_US'), 'Wed', 'Wed')
    assert(tz('2006-01-05', '%a', 'en_US'), 'Thu', 'Thu')
    assert(tz('2006-01-06', '%a', 'en_US'), 'Fri', 'Fri')
    assert(tz('2006-01-07', '%a', 'en_US'), 'Sat', 'Sat')

    // en_US days of week
    assert(tz('2006-01-01', '%A', 'en_US'), 'Sunday', 'Sunday')
    assert(tz('2006-01-02', '%A', 'en_US'), 'Monday', 'Monday')
    assert(tz('2006-01-03', '%A', 'en_US'), 'Tuesday', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'en_US'), 'Wednesday', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'en_US'), 'Thursday', 'Thursday')
    assert(tz('2006-01-06', '%A', 'en_US'), 'Friday', 'Friday')
    assert(tz('2006-01-07', '%A', 'en_US'), 'Saturday', 'Saturday')
})
