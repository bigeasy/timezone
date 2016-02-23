require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/nb_NO'))

    // nb_NO abbreviated days of week
    assert(tz('2006-01-01', '%a', 'nb_NO'), 'sø.', 'Sun')
    assert(tz('2006-01-02', '%a', 'nb_NO'), 'ma.', 'Mon')
    assert(tz('2006-01-03', '%a', 'nb_NO'), 'ti.', 'Tue')
    assert(tz('2006-01-04', '%a', 'nb_NO'), 'on.', 'Wed')
    assert(tz('2006-01-05', '%a', 'nb_NO'), 'to.', 'Thu')
    assert(tz('2006-01-06', '%a', 'nb_NO'), 'fr.', 'Fri')
    assert(tz('2006-01-07', '%a', 'nb_NO'), 'lø.', 'Sat')

    // nb_NO days of week
    assert(tz('2006-01-01', '%A', 'nb_NO'), 'søndag', 'Sunday')
    assert(tz('2006-01-02', '%A', 'nb_NO'), 'mandag', 'Monday')
    assert(tz('2006-01-03', '%A', 'nb_NO'), 'tirsdag', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'nb_NO'), 'onsdag', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'nb_NO'), 'torsdag', 'Thursday')
    assert(tz('2006-01-06', '%A', 'nb_NO'), 'fredag', 'Friday')
    assert(tz('2006-01-07', '%A', 'nb_NO'), 'lørdag', 'Saturday')
})
