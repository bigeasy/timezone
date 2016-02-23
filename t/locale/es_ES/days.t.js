require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_ES'))

    // es_ES abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_ES'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_ES'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_ES'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_ES'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_ES'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_ES'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_ES'), 'sáb', 'Sat')

    // es_ES days of week
    assert(tz('2006-01-01', '%A', 'es_ES'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_ES'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_ES'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_ES'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_ES'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_ES'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_ES'), 'sábado', 'Saturday')
})
