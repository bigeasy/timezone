require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/nl_NL'))

    // nl_NL abbreviated days of week
    assert(tz('2006-01-01', '%a', 'nl_NL'), 'zo', 'Sun')
    assert(tz('2006-01-02', '%a', 'nl_NL'), 'ma', 'Mon')
    assert(tz('2006-01-03', '%a', 'nl_NL'), 'di', 'Tue')
    assert(tz('2006-01-04', '%a', 'nl_NL'), 'wo', 'Wed')
    assert(tz('2006-01-05', '%a', 'nl_NL'), 'do', 'Thu')
    assert(tz('2006-01-06', '%a', 'nl_NL'), 'vr', 'Fri')
    assert(tz('2006-01-07', '%a', 'nl_NL'), 'za', 'Sat')

    // nl_NL days of week
    assert(tz('2006-01-01', '%A', 'nl_NL'), 'zondag', 'Sunday')
    assert(tz('2006-01-02', '%A', 'nl_NL'), 'maandag', 'Monday')
    assert(tz('2006-01-03', '%A', 'nl_NL'), 'dinsdag', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'nl_NL'), 'woensdag', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'nl_NL'), 'donderdag', 'Thursday')
    assert(tz('2006-01-06', '%A', 'nl_NL'), 'vrijdag', 'Friday')
    assert(tz('2006-01-07', '%A', 'nl_NL'), 'zaterdag', 'Saturday')
})
