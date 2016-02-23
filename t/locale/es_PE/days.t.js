require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_PE'))

    // es_PE abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_PE'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_PE'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_PE'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_PE'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_PE'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_PE'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_PE'), 'sáb', 'Sat')

    // es_PE days of week
    assert(tz('2006-01-01', '%A', 'es_PE'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_PE'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_PE'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_PE'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_PE'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_PE'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_PE'), 'sábado', 'Saturday')
})
