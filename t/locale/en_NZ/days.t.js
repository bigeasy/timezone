require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/en_NZ'))

    // en_NZ abbreviated days of week
    assert(tz('2006-01-01', '%a', 'en_NZ'), 'Sun', 'Sun')
    assert(tz('2006-01-02', '%a', 'en_NZ'), 'Mon', 'Mon')
    assert(tz('2006-01-03', '%a', 'en_NZ'), 'Tue', 'Tue')
    assert(tz('2006-01-04', '%a', 'en_NZ'), 'Wed', 'Wed')
    assert(tz('2006-01-05', '%a', 'en_NZ'), 'Thu', 'Thu')
    assert(tz('2006-01-06', '%a', 'en_NZ'), 'Fri', 'Fri')
    assert(tz('2006-01-07', '%a', 'en_NZ'), 'Sat', 'Sat')

    // en_NZ days of week
    assert(tz('2006-01-01', '%A', 'en_NZ'), 'Sunday', 'Sunday')
    assert(tz('2006-01-02', '%A', 'en_NZ'), 'Monday', 'Monday')
    assert(tz('2006-01-03', '%A', 'en_NZ'), 'Tuesday', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'en_NZ'), 'Wednesday', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'en_NZ'), 'Thursday', 'Thursday')
    assert(tz('2006-01-06', '%A', 'en_NZ'), 'Friday', 'Friday')
    assert(tz('2006-01-07', '%A', 'en_NZ'), 'Saturday', 'Saturday')
})
