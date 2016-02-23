require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_VE'))

    // es_VE abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_VE'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_VE'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_VE'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_VE'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_VE'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_VE'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_VE'), 'sáb', 'Sat')

    // es_VE days of week
    assert(tz('2006-01-01', '%A', 'es_VE'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_VE'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_VE'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_VE'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_VE'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_VE'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_VE'), 'sábado', 'Saturday')
})
