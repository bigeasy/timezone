require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/ur_PK'))

    // ur_PK abbreviated days of week
    assert(tz('2006-01-01', '%a', 'ur_PK'), 'اتوار', 'Sun')
    assert(tz('2006-01-02', '%a', 'ur_PK'), 'پير', 'Mon')
    assert(tz('2006-01-03', '%a', 'ur_PK'), 'منگل', 'Tue')
    assert(tz('2006-01-04', '%a', 'ur_PK'), 'بدھ', 'Wed')
    assert(tz('2006-01-05', '%a', 'ur_PK'), 'جمعرات', 'Thu')
    assert(tz('2006-01-06', '%a', 'ur_PK'), 'جمعه', 'Fri')
    assert(tz('2006-01-07', '%a', 'ur_PK'), 'هفته', 'Sat')

    // ur_PK days of week
    assert(tz('2006-01-01', '%A', 'ur_PK'), 'اتوار', 'Sunday')
    assert(tz('2006-01-02', '%A', 'ur_PK'), 'پير', 'Monday')
    assert(tz('2006-01-03', '%A', 'ur_PK'), 'منگل', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'ur_PK'), 'بدھ', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'ur_PK'), 'جمعرات', 'Thursday')
    assert(tz('2006-01-06', '%A', 'ur_PK'), 'جمعه', 'Friday')
    assert(tz('2006-01-07', '%A', 'ur_PK'), 'هفته', 'Saturday')
})
