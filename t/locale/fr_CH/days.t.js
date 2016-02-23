require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/fr_CH'))

    // fr_CH abbreviated days of week
    assert(tz('2006-01-01', '%a', 'fr_CH'), 'dim', 'Sun')
    assert(tz('2006-01-02', '%a', 'fr_CH'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'fr_CH'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'fr_CH'), 'mer', 'Wed')
    assert(tz('2006-01-05', '%a', 'fr_CH'), 'jeu', 'Thu')
    assert(tz('2006-01-06', '%a', 'fr_CH'), 'ven', 'Fri')
    assert(tz('2006-01-07', '%a', 'fr_CH'), 'sam', 'Sat')

    // fr_CH days of week
    assert(tz('2006-01-01', '%A', 'fr_CH'), 'dimanche', 'Sunday')
    assert(tz('2006-01-02', '%A', 'fr_CH'), 'lundi', 'Monday')
    assert(tz('2006-01-03', '%A', 'fr_CH'), 'mardi', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'fr_CH'), 'mercredi', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'fr_CH'), 'jeudi', 'Thursday')
    assert(tz('2006-01-06', '%A', 'fr_CH'), 'vendredi', 'Friday')
    assert(tz('2006-01-07', '%A', 'fr_CH'), 'samedi', 'Saturday')
})
