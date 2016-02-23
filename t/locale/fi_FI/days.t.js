require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/fi_FI'))

    // fi_FI abbreviated days of week
    assert(tz('2006-01-01', '%a', 'fi_FI'), 'su', 'Sun')
    assert(tz('2006-01-02', '%a', 'fi_FI'), 'ma', 'Mon')
    assert(tz('2006-01-03', '%a', 'fi_FI'), 'ti', 'Tue')
    assert(tz('2006-01-04', '%a', 'fi_FI'), 'ke', 'Wed')
    assert(tz('2006-01-05', '%a', 'fi_FI'), 'to', 'Thu')
    assert(tz('2006-01-06', '%a', 'fi_FI'), 'pe', 'Fri')
    assert(tz('2006-01-07', '%a', 'fi_FI'), 'la', 'Sat')

    // fi_FI days of week
    assert(tz('2006-01-01', '%A', 'fi_FI'), 'sunnuntai', 'Sunday')
    assert(tz('2006-01-02', '%A', 'fi_FI'), 'maanantai', 'Monday')
    assert(tz('2006-01-03', '%A', 'fi_FI'), 'tiistai', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'fi_FI'), 'keskiviikko', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'fi_FI'), 'torstai', 'Thursday')
    assert(tz('2006-01-06', '%A', 'fi_FI'), 'perjantai', 'Friday')
    assert(tz('2006-01-07', '%A', 'fi_FI'), 'lauantai', 'Saturday')
})
