require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/sv_SE'))

    // sv_SE abbreviated days of week
    assert(tz('2006-01-01', '%a', 'sv_SE'), 'sön', 'Sun')
    assert(tz('2006-01-02', '%a', 'sv_SE'), 'mån', 'Mon')
    assert(tz('2006-01-03', '%a', 'sv_SE'), 'tis', 'Tue')
    assert(tz('2006-01-04', '%a', 'sv_SE'), 'ons', 'Wed')
    assert(tz('2006-01-05', '%a', 'sv_SE'), 'tor', 'Thu')
    assert(tz('2006-01-06', '%a', 'sv_SE'), 'fre', 'Fri')
    assert(tz('2006-01-07', '%a', 'sv_SE'), 'lör', 'Sat')

    // sv_SE days of week
    assert(tz('2006-01-01', '%A', 'sv_SE'), 'söndag', 'Sunday')
    assert(tz('2006-01-02', '%A', 'sv_SE'), 'måndag', 'Monday')
    assert(tz('2006-01-03', '%A', 'sv_SE'), 'tisdag', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'sv_SE'), 'onsdag', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'sv_SE'), 'torsdag', 'Thursday')
    assert(tz('2006-01-06', '%A', 'sv_SE'), 'fredag', 'Friday')
    assert(tz('2006-01-07', '%A', 'sv_SE'), 'lördag', 'Saturday')
})
