require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_GT'))

    // es_GT abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_GT'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_GT'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_GT'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_GT'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_GT'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_GT'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_GT'), 'sáb', 'Sat')

    // es_GT days of week
    assert(tz('2006-01-01', '%A', 'es_GT'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_GT'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_GT'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_GT'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_GT'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_GT'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_GT'), 'sábado', 'Saturday')
})
