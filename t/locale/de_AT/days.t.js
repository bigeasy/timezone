require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/de_AT'))

    // de_AT abbreviated days of week
    assert(tz('2006-01-01', '%a', 'de_AT'), 'Son', 'Sun')
    assert(tz('2006-01-02', '%a', 'de_AT'), 'Mon', 'Mon')
    assert(tz('2006-01-03', '%a', 'de_AT'), 'Die', 'Tue')
    assert(tz('2006-01-04', '%a', 'de_AT'), 'Mit', 'Wed')
    assert(tz('2006-01-05', '%a', 'de_AT'), 'Don', 'Thu')
    assert(tz('2006-01-06', '%a', 'de_AT'), 'Fre', 'Fri')
    assert(tz('2006-01-07', '%a', 'de_AT'), 'Sam', 'Sat')

    // de_AT days of week
    assert(tz('2006-01-01', '%A', 'de_AT'), 'Sonntag', 'Sunday')
    assert(tz('2006-01-02', '%A', 'de_AT'), 'Montag', 'Monday')
    assert(tz('2006-01-03', '%A', 'de_AT'), 'Dienstag', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'de_AT'), 'Mittwoch', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'de_AT'), 'Donnerstag', 'Thursday')
    assert(tz('2006-01-06', '%A', 'de_AT'), 'Freitag', 'Friday')
    assert(tz('2006-01-07', '%A', 'de_AT'), 'Samstag', 'Saturday')
})
