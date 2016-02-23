require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_CR'))

    // es_CR abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_CR'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_CR'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_CR'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_CR'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_CR'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_CR'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_CR'), 'sáb', 'Sat')

    // es_CR days of week
    assert(tz('2006-01-01', '%A', 'es_CR'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_CR'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_CR'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_CR'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_CR'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_CR'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_CR'), 'sábado', 'Saturday')
})
