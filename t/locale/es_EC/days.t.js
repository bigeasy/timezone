require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_EC'))

    // es_EC abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_EC'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_EC'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_EC'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_EC'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_EC'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_EC'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_EC'), 'sáb', 'Sat')

    // es_EC days of week
    assert(tz('2006-01-01', '%A', 'es_EC'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_EC'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_EC'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_EC'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_EC'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_EC'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_EC'), 'sábado', 'Saturday')
})
