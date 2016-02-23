require('proof')(24, function (assert) {
    var tz = require('timezone')(require('timezone/fr_CA'))

    // fr_CA abbreviated months
    assert(tz('2000-01-01', '%b', 'fr_CA'), 'jan', 'Jan')
    assert(tz('2000-02-01', '%b', 'fr_CA'), 'fév', 'Feb')
    assert(tz('2000-03-01', '%b', 'fr_CA'), 'mar', 'Mar')
    assert(tz('2000-04-01', '%b', 'fr_CA'), 'avr', 'Apr')
    assert(tz('2000-05-01', '%b', 'fr_CA'), 'mai', 'May')
    assert(tz('2000-06-01', '%b', 'fr_CA'), 'jun', 'Jun')
    assert(tz('2000-07-01', '%b', 'fr_CA'), 'jui', 'Jul')
    assert(tz('2000-08-01', '%b', 'fr_CA'), 'aoû', 'Aug')
    assert(tz('2000-09-01', '%b', 'fr_CA'), 'sep', 'Sep')
    assert(tz('2000-10-01', '%b', 'fr_CA'), 'oct', 'Oct')
    assert(tz('2000-11-01', '%b', 'fr_CA'), 'nov', 'Nov')
    assert(tz('2000-12-01', '%b', 'fr_CA'), 'déc', 'Dec')

    // ' + name + ' months
    assert(tz('2000-01-01', '%B', 'fr_CA'), 'janvier', 'January')
    assert(tz('2000-02-01', '%B', 'fr_CA'), 'février', 'February')
    assert(tz('2000-03-01', '%B', 'fr_CA'), 'mars', 'March')
    assert(tz('2000-04-01', '%B', 'fr_CA'), 'avril', 'April')
    assert(tz('2000-05-01', '%B', 'fr_CA'), 'mai', 'May')
    assert(tz('2000-06-01', '%B', 'fr_CA'), 'juin', 'June')
    assert(tz('2000-07-01', '%B', 'fr_CA'), 'juillet', 'July')
    assert(tz('2000-08-01', '%B', 'fr_CA'), 'août', 'August')
    assert(tz('2000-09-01', '%B', 'fr_CA'), 'septembre', 'September')
    assert(tz('2000-10-01', '%B', 'fr_CA'), 'octobre', 'October')
    assert(tz('2000-11-01', '%B', 'fr_CA'), 'novembre', 'November')
    assert(tz('2000-12-01', '%B', 'fr_CA'), 'décembre', 'December')
})
