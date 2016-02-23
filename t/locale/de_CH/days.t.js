require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/de_CH'))

    // de_CH abbreviated days of week
    assert(tz('2006-01-01', '%a', 'de_CH'), 'Son', 'Sun')
    assert(tz('2006-01-02', '%a', 'de_CH'), 'Mon', 'Mon')
    assert(tz('2006-01-03', '%a', 'de_CH'), 'Die', 'Tue')
    assert(tz('2006-01-04', '%a', 'de_CH'), 'Mit', 'Wed')
    assert(tz('2006-01-05', '%a', 'de_CH'), 'Don', 'Thu')
    assert(tz('2006-01-06', '%a', 'de_CH'), 'Fre', 'Fri')
    assert(tz('2006-01-07', '%a', 'de_CH'), 'Sam', 'Sat')

    // de_CH days of week
    assert(tz('2006-01-01', '%A', 'de_CH'), 'Sonntag', 'Sunday')
    assert(tz('2006-01-02', '%A', 'de_CH'), 'Montag', 'Monday')
    assert(tz('2006-01-03', '%A', 'de_CH'), 'Dienstag', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'de_CH'), 'Mittwoch', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'de_CH'), 'Donnerstag', 'Thursday')
    assert(tz('2006-01-06', '%A', 'de_CH'), 'Freitag', 'Friday')
    assert(tz('2006-01-07', '%A', 'de_CH'), 'Samstag', 'Saturday')
})
