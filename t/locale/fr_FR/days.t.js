require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/fr_FR'))

    // fr_FR abbreviated days of week
    assert(tz('2006-01-01', '%a', 'fr_FR'), 'dim.', 'Sun')
    assert(tz('2006-01-02', '%a', 'fr_FR'), 'lun.', 'Mon')
    assert(tz('2006-01-03', '%a', 'fr_FR'), 'mar.', 'Tue')
    assert(tz('2006-01-04', '%a', 'fr_FR'), 'mer.', 'Wed')
    assert(tz('2006-01-05', '%a', 'fr_FR'), 'jeu.', 'Thu')
    assert(tz('2006-01-06', '%a', 'fr_FR'), 'ven.', 'Fri')
    assert(tz('2006-01-07', '%a', 'fr_FR'), 'sam.', 'Sat')

    // fr_FR days of week
    assert(tz('2006-01-01', '%A', 'fr_FR'), 'dimanche', 'Sunday')
    assert(tz('2006-01-02', '%A', 'fr_FR'), 'lundi', 'Monday')
    assert(tz('2006-01-03', '%A', 'fr_FR'), 'mardi', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'fr_FR'), 'mercredi', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'fr_FR'), 'jeudi', 'Thursday')
    assert(tz('2006-01-06', '%A', 'fr_FR'), 'vendredi', 'Friday')
    assert(tz('2006-01-07', '%A', 'fr_FR'), 'samedi', 'Saturday')
})
