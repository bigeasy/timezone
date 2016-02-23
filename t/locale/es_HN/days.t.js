require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_HN'))

    // es_HN abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_HN'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_HN'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_HN'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_HN'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_HN'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_HN'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_HN'), 'sáb', 'Sat')

    // es_HN days of week
    assert(tz('2006-01-01', '%A', 'es_HN'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_HN'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_HN'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_HN'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_HN'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_HN'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_HN'), 'sábado', 'Saturday')
})
