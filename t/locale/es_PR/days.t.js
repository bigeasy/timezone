require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_PR'))

    // es_PR abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_PR'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_PR'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_PR'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_PR'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_PR'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_PR'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_PR'), 'sáb', 'Sat')

    // es_PR days of week
    assert(tz('2006-01-01', '%A', 'es_PR'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_PR'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_PR'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_PR'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_PR'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_PR'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_PR'), 'sábado', 'Saturday')
})
