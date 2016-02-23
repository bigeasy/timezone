require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/fr_BE'))

    // fr_BE abbreviated days of week
    assert(tz('2006-01-01', '%a', 'fr_BE'), 'dim', 'Sun')
    assert(tz('2006-01-02', '%a', 'fr_BE'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'fr_BE'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'fr_BE'), 'mer', 'Wed')
    assert(tz('2006-01-05', '%a', 'fr_BE'), 'jeu', 'Thu')
    assert(tz('2006-01-06', '%a', 'fr_BE'), 'ven', 'Fri')
    assert(tz('2006-01-07', '%a', 'fr_BE'), 'sam', 'Sat')

    // fr_BE days of week
    assert(tz('2006-01-01', '%A', 'fr_BE'), 'dimanche', 'Sunday')
    assert(tz('2006-01-02', '%A', 'fr_BE'), 'lundi', 'Monday')
    assert(tz('2006-01-03', '%A', 'fr_BE'), 'mardi', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'fr_BE'), 'mercredi', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'fr_BE'), 'jeudi', 'Thursday')
    assert(tz('2006-01-06', '%A', 'fr_BE'), 'vendredi', 'Friday')
    assert(tz('2006-01-07', '%A', 'fr_BE'), 'samedi', 'Saturday')
})
