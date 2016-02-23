require('proof')(24, function (assert) {
    var tz = require('timezone')(require('timezone/fr_BE'))

    // fr_BE abbreviated months
    assert(tz('2000-01-01', '%b', 'fr_BE'), 'jan', 'Jan')
    assert(tz('2000-02-01', '%b', 'fr_BE'), 'fév', 'Feb')
    assert(tz('2000-03-01', '%b', 'fr_BE'), 'mar', 'Mar')
    assert(tz('2000-04-01', '%b', 'fr_BE'), 'avr', 'Apr')
    assert(tz('2000-05-01', '%b', 'fr_BE'), 'mai', 'May')
    assert(tz('2000-06-01', '%b', 'fr_BE'), 'jun', 'Jun')
    assert(tz('2000-07-01', '%b', 'fr_BE'), 'jui', 'Jul')
    assert(tz('2000-08-01', '%b', 'fr_BE'), 'aoû', 'Aug')
    assert(tz('2000-09-01', '%b', 'fr_BE'), 'sep', 'Sep')
    assert(tz('2000-10-01', '%b', 'fr_BE'), 'oct', 'Oct')
    assert(tz('2000-11-01', '%b', 'fr_BE'), 'nov', 'Nov')
    assert(tz('2000-12-01', '%b', 'fr_BE'), 'déc', 'Dec')

    // ' + name + ' months
    assert(tz('2000-01-01', '%B', 'fr_BE'), 'janvier', 'January')
    assert(tz('2000-02-01', '%B', 'fr_BE'), 'février', 'February')
    assert(tz('2000-03-01', '%B', 'fr_BE'), 'mars', 'March')
    assert(tz('2000-04-01', '%B', 'fr_BE'), 'avril', 'April')
    assert(tz('2000-05-01', '%B', 'fr_BE'), 'mai', 'May')
    assert(tz('2000-06-01', '%B', 'fr_BE'), 'juin', 'June')
    assert(tz('2000-07-01', '%B', 'fr_BE'), 'juillet', 'July')
    assert(tz('2000-08-01', '%B', 'fr_BE'), 'août', 'August')
    assert(tz('2000-09-01', '%B', 'fr_BE'), 'septembre', 'September')
    assert(tz('2000-10-01', '%B', 'fr_BE'), 'octobre', 'October')
    assert(tz('2000-11-01', '%B', 'fr_BE'), 'novembre', 'November')
    assert(tz('2000-12-01', '%B', 'fr_BE'), 'décembre', 'December')
})
