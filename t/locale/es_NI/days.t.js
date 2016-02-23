require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_NI'))

    // es_NI abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_NI'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_NI'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_NI'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_NI'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_NI'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_NI'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_NI'), 'sáb', 'Sat')

    // es_NI days of week
    assert(tz('2006-01-01', '%A', 'es_NI'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_NI'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_NI'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_NI'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_NI'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_NI'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_NI'), 'sábado', 'Saturday')
})
