require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/nds_DE'))

    // nds_DE abbreviated days of week
    assert(tz('2006-01-01', '%a', 'nds_DE'), 'Sdag', 'Sun')
    assert(tz('2006-01-02', '%a', 'nds_DE'), 'Maan', 'Mon')
    assert(tz('2006-01-03', '%a', 'nds_DE'), 'Ding', 'Tue')
    assert(tz('2006-01-04', '%a', 'nds_DE'), 'Migg', 'Wed')
    assert(tz('2006-01-05', '%a', 'nds_DE'), 'Dunn', 'Thu')
    assert(tz('2006-01-06', '%a', 'nds_DE'), 'Free', 'Fri')
    assert(tz('2006-01-07', '%a', 'nds_DE'), 'Svd.', 'Sat')

    // nds_DE days of week
    assert(tz('2006-01-01', '%A', 'nds_DE'), 'Sünndag', 'Sunday')
    assert(tz('2006-01-02', '%A', 'nds_DE'), 'Maandag', 'Monday')
    assert(tz('2006-01-03', '%A', 'nds_DE'), 'Dingsdag', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'nds_DE'), 'Middeweek', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'nds_DE'), 'Dunnersdag', 'Thursday')
    assert(tz('2006-01-06', '%A', 'nds_DE'), 'Freedag', 'Friday')
    assert(tz('2006-01-07', '%A', 'nds_DE'), 'Sünnavend', 'Saturday')
})
