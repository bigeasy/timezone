require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/hu_HU'))

    // hu_HU abbreviated days of week
    assert(tz('2006-01-01', '%a', 'hu_HU'), 'v', 'Sun')
    assert(tz('2006-01-02', '%a', 'hu_HU'), 'h', 'Mon')
    assert(tz('2006-01-03', '%a', 'hu_HU'), 'k', 'Tue')
    assert(tz('2006-01-04', '%a', 'hu_HU'), 'sze', 'Wed')
    assert(tz('2006-01-05', '%a', 'hu_HU'), 'cs', 'Thu')
    assert(tz('2006-01-06', '%a', 'hu_HU'), 'p', 'Fri')
    assert(tz('2006-01-07', '%a', 'hu_HU'), 'szo', 'Sat')

    // hu_HU days of week
    assert(tz('2006-01-01', '%A', 'hu_HU'), 'vasárnap', 'Sunday')
    assert(tz('2006-01-02', '%A', 'hu_HU'), 'hétfő', 'Monday')
    assert(tz('2006-01-03', '%A', 'hu_HU'), 'kedd', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'hu_HU'), 'szerda', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'hu_HU'), 'csütörtök', 'Thursday')
    assert(tz('2006-01-06', '%A', 'hu_HU'), 'péntek', 'Friday')
    assert(tz('2006-01-07', '%A', 'hu_HU'), 'szombat', 'Saturday')
})
