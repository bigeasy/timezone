require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/fr_CA'))

    // fr_CA abbreviated days of week
    assert(tz('2006-01-01', '%a', 'fr_CA'), 'dim', 'Sun')
    assert(tz('2006-01-02', '%a', 'fr_CA'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'fr_CA'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'fr_CA'), 'mer', 'Wed')
    assert(tz('2006-01-05', '%a', 'fr_CA'), 'jeu', 'Thu')
    assert(tz('2006-01-06', '%a', 'fr_CA'), 'ven', 'Fri')
    assert(tz('2006-01-07', '%a', 'fr_CA'), 'sam', 'Sat')

    // fr_CA days of week
    assert(tz('2006-01-01', '%A', 'fr_CA'), 'dimanche', 'Sunday')
    assert(tz('2006-01-02', '%A', 'fr_CA'), 'lundi', 'Monday')
    assert(tz('2006-01-03', '%A', 'fr_CA'), 'mardi', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'fr_CA'), 'mercredi', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'fr_CA'), 'jeudi', 'Thursday')
    assert(tz('2006-01-06', '%A', 'fr_CA'), 'vendredi', 'Friday')
    assert(tz('2006-01-07', '%A', 'fr_CA'), 'samedi', 'Saturday')
})
