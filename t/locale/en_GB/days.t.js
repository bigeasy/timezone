require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/en_GB'))

    // en_GB abbreviated days of week
    assert(tz('2006-01-01', '%a', 'en_GB'), 'Sun', 'Sun')
    assert(tz('2006-01-02', '%a', 'en_GB'), 'Mon', 'Mon')
    assert(tz('2006-01-03', '%a', 'en_GB'), 'Tue', 'Tue')
    assert(tz('2006-01-04', '%a', 'en_GB'), 'Wed', 'Wed')
    assert(tz('2006-01-05', '%a', 'en_GB'), 'Thu', 'Thu')
    assert(tz('2006-01-06', '%a', 'en_GB'), 'Fri', 'Fri')
    assert(tz('2006-01-07', '%a', 'en_GB'), 'Sat', 'Sat')

    // en_GB days of week
    assert(tz('2006-01-01', '%A', 'en_GB'), 'Sunday', 'Sunday')
    assert(tz('2006-01-02', '%A', 'en_GB'), 'Monday', 'Monday')
    assert(tz('2006-01-03', '%A', 'en_GB'), 'Tuesday', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'en_GB'), 'Wednesday', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'en_GB'), 'Thursday', 'Thursday')
    assert(tz('2006-01-06', '%A', 'en_GB'), 'Friday', 'Friday')
    assert(tz('2006-01-07', '%A', 'en_GB'), 'Saturday', 'Saturday')
})
