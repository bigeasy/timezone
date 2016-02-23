require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_CL'))

    // es_CL abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_CL'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_CL'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_CL'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_CL'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_CL'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_CL'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_CL'), 'sáb', 'Sat')

    // es_CL days of week
    assert(tz('2006-01-01', '%A', 'es_CL'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_CL'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_CL'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_CL'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_CL'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_CL'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_CL'), 'sábado', 'Saturday')
})
