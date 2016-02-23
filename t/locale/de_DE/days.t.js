require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/de_DE'))

    // de_DE abbreviated days of week
    assert(tz('2006-01-01', '%a', 'de_DE'), 'So', 'Sun')
    assert(tz('2006-01-02', '%a', 'de_DE'), 'Mo', 'Mon')
    assert(tz('2006-01-03', '%a', 'de_DE'), 'Di', 'Tue')
    assert(tz('2006-01-04', '%a', 'de_DE'), 'Mi', 'Wed')
    assert(tz('2006-01-05', '%a', 'de_DE'), 'Do', 'Thu')
    assert(tz('2006-01-06', '%a', 'de_DE'), 'Fr', 'Fri')
    assert(tz('2006-01-07', '%a', 'de_DE'), 'Sa', 'Sat')

    // de_DE days of week
    assert(tz('2006-01-01', '%A', 'de_DE'), 'Sonntag', 'Sunday')
    assert(tz('2006-01-02', '%A', 'de_DE'), 'Montag', 'Monday')
    assert(tz('2006-01-03', '%A', 'de_DE'), 'Dienstag', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'de_DE'), 'Mittwoch', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'de_DE'), 'Donnerstag', 'Thursday')
    assert(tz('2006-01-06', '%A', 'de_DE'), 'Freitag', 'Friday')
    assert(tz('2006-01-07', '%A', 'de_DE'), 'Samstag', 'Saturday')
})
