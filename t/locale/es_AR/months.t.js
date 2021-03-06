require('proof')(24, function (assert) {
    var tz = require('timezone')(require('timezone/es_AR'))

    // es_AR abbreviated months
    assert(tz('2000-01-01', '%b', 'es_AR'), 'ene', 'Jan')
    assert(tz('2000-02-01', '%b', 'es_AR'), 'feb', 'Feb')
    assert(tz('2000-03-01', '%b', 'es_AR'), 'mar', 'Mar')
    assert(tz('2000-04-01', '%b', 'es_AR'), 'abr', 'Apr')
    assert(tz('2000-05-01', '%b', 'es_AR'), 'may', 'May')
    assert(tz('2000-06-01', '%b', 'es_AR'), 'jun', 'Jun')
    assert(tz('2000-07-01', '%b', 'es_AR'), 'jul', 'Jul')
    assert(tz('2000-08-01', '%b', 'es_AR'), 'ago', 'Aug')
    assert(tz('2000-09-01', '%b', 'es_AR'), 'sep', 'Sep')
    assert(tz('2000-10-01', '%b', 'es_AR'), 'oct', 'Oct')
    assert(tz('2000-11-01', '%b', 'es_AR'), 'nov', 'Nov')
    assert(tz('2000-12-01', '%b', 'es_AR'), 'dic', 'Dec')

    // ' + name + ' months
    assert(tz('2000-01-01', '%B', 'es_AR'), 'enero', 'January')
    assert(tz('2000-02-01', '%B', 'es_AR'), 'febrero', 'February')
    assert(tz('2000-03-01', '%B', 'es_AR'), 'marzo', 'March')
    assert(tz('2000-04-01', '%B', 'es_AR'), 'abril', 'April')
    assert(tz('2000-05-01', '%B', 'es_AR'), 'mayo', 'May')
    assert(tz('2000-06-01', '%B', 'es_AR'), 'junio', 'June')
    assert(tz('2000-07-01', '%B', 'es_AR'), 'julio', 'July')
    assert(tz('2000-08-01', '%B', 'es_AR'), 'agosto', 'August')
    assert(tz('2000-09-01', '%B', 'es_AR'), 'septiembre', 'September')
    assert(tz('2000-10-01', '%B', 'es_AR'), 'octubre', 'October')
    assert(tz('2000-11-01', '%B', 'es_AR'), 'noviembre', 'November')
    assert(tz('2000-12-01', '%B', 'es_AR'), 'diciembre', 'December')
})
