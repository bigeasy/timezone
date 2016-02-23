require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_SV'))

    // es_SV abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_SV'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_SV'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_SV'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_SV'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_SV'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_SV'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_SV'), 'sáb', 'Sat')

    // es_SV days of week
    assert(tz('2006-01-01', '%A', 'es_SV'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_SV'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_SV'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_SV'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_SV'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_SV'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_SV'), 'sábado', 'Saturday')
})
