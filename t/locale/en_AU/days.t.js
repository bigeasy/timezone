require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/en_AU'))

    // en_AU abbreviated days of week
    assert(tz('2006-01-01', '%a', 'en_AU'), 'Sun', 'Sun')
    assert(tz('2006-01-02', '%a', 'en_AU'), 'Mon', 'Mon')
    assert(tz('2006-01-03', '%a', 'en_AU'), 'Tue', 'Tue')
    assert(tz('2006-01-04', '%a', 'en_AU'), 'Wed', 'Wed')
    assert(tz('2006-01-05', '%a', 'en_AU'), 'Thu', 'Thu')
    assert(tz('2006-01-06', '%a', 'en_AU'), 'Fri', 'Fri')
    assert(tz('2006-01-07', '%a', 'en_AU'), 'Sat', 'Sat')

    // en_AU days of week
    assert(tz('2006-01-01', '%A', 'en_AU'), 'Sunday', 'Sunday')
    assert(tz('2006-01-02', '%A', 'en_AU'), 'Monday', 'Monday')
    assert(tz('2006-01-03', '%A', 'en_AU'), 'Tuesday', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'en_AU'), 'Wednesday', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'en_AU'), 'Thursday', 'Thursday')
    assert(tz('2006-01-06', '%A', 'en_AU'), 'Friday', 'Friday')
    assert(tz('2006-01-07', '%A', 'en_AU'), 'Saturday', 'Saturday')
})
