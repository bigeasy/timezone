require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/nl_BE'))

    // nl_BE abbreviated days of week
    assert(tz('2006-01-01', '%a', 'nl_BE'), 'zo', 'Sun')
    assert(tz('2006-01-02', '%a', 'nl_BE'), 'ma', 'Mon')
    assert(tz('2006-01-03', '%a', 'nl_BE'), 'di', 'Tue')
    assert(tz('2006-01-04', '%a', 'nl_BE'), 'wo', 'Wed')
    assert(tz('2006-01-05', '%a', 'nl_BE'), 'do', 'Thu')
    assert(tz('2006-01-06', '%a', 'nl_BE'), 'vr', 'Fri')
    assert(tz('2006-01-07', '%a', 'nl_BE'), 'za', 'Sat')

    // nl_BE days of week
    assert(tz('2006-01-01', '%A', 'nl_BE'), 'zondag', 'Sunday')
    assert(tz('2006-01-02', '%A', 'nl_BE'), 'maandag', 'Monday')
    assert(tz('2006-01-03', '%A', 'nl_BE'), 'dinsdag', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'nl_BE'), 'woensdag', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'nl_BE'), 'donderdag', 'Thursday')
    assert(tz('2006-01-06', '%A', 'nl_BE'), 'vrijdag', 'Friday')
    assert(tz('2006-01-07', '%A', 'nl_BE'), 'zaterdag', 'Saturday')
})
