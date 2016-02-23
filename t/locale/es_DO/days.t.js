require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_DO'))

    // es_DO abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_DO'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_DO'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_DO'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_DO'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_DO'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_DO'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_DO'), 'sáb', 'Sat')

    // es_DO days of week
    assert(tz('2006-01-01', '%A', 'es_DO'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_DO'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_DO'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_DO'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_DO'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_DO'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_DO'), 'sábado', 'Saturday')
})
