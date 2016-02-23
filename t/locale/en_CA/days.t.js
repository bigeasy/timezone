require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/en_CA'))

    // en_CA abbreviated days of week
    assert(tz('2006-01-01', '%a', 'en_CA'), 'Sun', 'Sun')
    assert(tz('2006-01-02', '%a', 'en_CA'), 'Mon', 'Mon')
    assert(tz('2006-01-03', '%a', 'en_CA'), 'Tue', 'Tue')
    assert(tz('2006-01-04', '%a', 'en_CA'), 'Wed', 'Wed')
    assert(tz('2006-01-05', '%a', 'en_CA'), 'Thu', 'Thu')
    assert(tz('2006-01-06', '%a', 'en_CA'), 'Fri', 'Fri')
    assert(tz('2006-01-07', '%a', 'en_CA'), 'Sat', 'Sat')

    // en_CA days of week
    assert(tz('2006-01-01', '%A', 'en_CA'), 'Sunday', 'Sunday')
    assert(tz('2006-01-02', '%A', 'en_CA'), 'Monday', 'Monday')
    assert(tz('2006-01-03', '%A', 'en_CA'), 'Tuesday', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'en_CA'), 'Wednesday', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'en_CA'), 'Thursday', 'Thursday')
    assert(tz('2006-01-06', '%A', 'en_CA'), 'Friday', 'Friday')
    assert(tz('2006-01-07', '%A', 'en_CA'), 'Saturday', 'Saturday')
})
