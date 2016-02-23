require('proof')(24, function (assert) {
    var tz = require('timezone')(require('timezone/es_ES'))

    // es_ES abbreviated months
    assert(tz('2000-01-01', '%b', 'es_ES'), 'ene', 'Jan')
    assert(tz('2000-02-01', '%b', 'es_ES'), 'feb', 'Feb')
    assert(tz('2000-03-01', '%b', 'es_ES'), 'mar', 'Mar')
    assert(tz('2000-04-01', '%b', 'es_ES'), 'abr', 'Apr')
    assert(tz('2000-05-01', '%b', 'es_ES'), 'may', 'May')
    assert(tz('2000-06-01', '%b', 'es_ES'), 'jun', 'Jun')
    assert(tz('2000-07-01', '%b', 'es_ES'), 'jul', 'Jul')
    assert(tz('2000-08-01', '%b', 'es_ES'), 'ago', 'Aug')
    assert(tz('2000-09-01', '%b', 'es_ES'), 'sep', 'Sep')
    assert(tz('2000-10-01', '%b', 'es_ES'), 'oct', 'Oct')
    assert(tz('2000-11-01', '%b', 'es_ES'), 'nov', 'Nov')
    assert(tz('2000-12-01', '%b', 'es_ES'), 'dic', 'Dec')

    // ' + name + ' months
    assert(tz('2000-01-01', '%B', 'es_ES'), 'enero', 'January')
    assert(tz('2000-02-01', '%B', 'es_ES'), 'febrero', 'February')
    assert(tz('2000-03-01', '%B', 'es_ES'), 'marzo', 'March')
    assert(tz('2000-04-01', '%B', 'es_ES'), 'abril', 'April')
    assert(tz('2000-05-01', '%B', 'es_ES'), 'mayo', 'May')
    assert(tz('2000-06-01', '%B', 'es_ES'), 'junio', 'June')
    assert(tz('2000-07-01', '%B', 'es_ES'), 'julio', 'July')
    assert(tz('2000-08-01', '%B', 'es_ES'), 'agosto', 'August')
    assert(tz('2000-09-01', '%B', 'es_ES'), 'septiembre', 'September')
    assert(tz('2000-10-01', '%B', 'es_ES'), 'octubre', 'October')
    assert(tz('2000-11-01', '%B', 'es_ES'), 'noviembre', 'November')
    assert(tz('2000-12-01', '%B', 'es_ES'), 'diciembre', 'December')
})
