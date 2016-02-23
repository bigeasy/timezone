require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/pt_PT'))

    // pt_PT abbreviated days of week
    assert(tz('2006-01-01', '%a', 'pt_PT'), 'Dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'pt_PT'), 'Seg', 'Mon')
    assert(tz('2006-01-03', '%a', 'pt_PT'), 'Ter', 'Tue')
    assert(tz('2006-01-04', '%a', 'pt_PT'), 'Qua', 'Wed')
    assert(tz('2006-01-05', '%a', 'pt_PT'), 'Qui', 'Thu')
    assert(tz('2006-01-06', '%a', 'pt_PT'), 'Sex', 'Fri')
    assert(tz('2006-01-07', '%a', 'pt_PT'), 'Sáb', 'Sat')

    // pt_PT days of week
    assert(tz('2006-01-01', '%A', 'pt_PT'), 'Domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'pt_PT'), 'Segunda', 'Monday')
    assert(tz('2006-01-03', '%A', 'pt_PT'), 'Terça', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'pt_PT'), 'Quarta', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'pt_PT'), 'Quinta', 'Thursday')
    assert(tz('2006-01-06', '%A', 'pt_PT'), 'Sexta', 'Friday')
    assert(tz('2006-01-07', '%A', 'pt_PT'), 'Sábado', 'Saturday')
})
