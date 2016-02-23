require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_PA'))

    // es_PA abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_PA'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_PA'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_PA'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_PA'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_PA'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_PA'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_PA'), 'sáb', 'Sat')

    // es_PA days of week
    assert(tz('2006-01-01', '%A', 'es_PA'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_PA'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_PA'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_PA'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_PA'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_PA'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_PA'), 'sábado', 'Saturday')
})
