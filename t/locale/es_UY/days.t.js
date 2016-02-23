require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/es_UY'))

    // es_UY abbreviated days of week
    assert(tz('2006-01-01', '%a', 'es_UY'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'es_UY'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'es_UY'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'es_UY'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'es_UY'), 'jue', 'Thu')
    assert(tz('2006-01-06', '%a', 'es_UY'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'es_UY'), 'sáb', 'Sat')

    // es_UY days of week
    assert(tz('2006-01-01', '%A', 'es_UY'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'es_UY'), 'lunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'es_UY'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'es_UY'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'es_UY'), 'jueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'es_UY'), 'viernes', 'Friday')
    assert(tz('2006-01-07', '%A', 'es_UY'), 'sábado', 'Saturday')
})
