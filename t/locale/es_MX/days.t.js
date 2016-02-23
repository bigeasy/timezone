require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_MX'))

    // es_MX abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_MX'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_MX'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_MX'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_MX'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_MX'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_MX'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_MX'), 'sáb', 'Sat')

    // es_MX days of week
    assert(tz('2006-01-01', '%A', 'es_MX'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_MX'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_MX'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_MX'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_MX'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_MX'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_MX'), 'sábado', 'Saturday')
})
