require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_CO'))

    // es_CO abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_CO'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_CO'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_CO'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_CO'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_CO'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_CO'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_CO'), 'sáb', 'Sat')

    // es_CO days of week
    assert(tz('2006-01-01', '%A', 'es_CO'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_CO'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_CO'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_CO'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_CO'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_CO'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_CO'), 'sábado', 'Saturday')
})
