require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_AR'))

    // es_AR abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_AR'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_AR'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_AR'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_AR'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_AR'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_AR'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_AR'), 'sáb', 'Sat')

    // es_AR days of week
    assert(tz('2006-01-01', '%A', 'es_AR'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_AR'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_AR'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_AR'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_AR'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_AR'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_AR'), 'sábado', 'Saturday')
})
