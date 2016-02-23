require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/pt_BR'))

    // pt_BR abbreviated days of week
    assert(tz('2006-01-01', '%a', 'pt_BR'), 'Dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'pt_BR'), 'Seg', 'Mon')
    assert(tz('2006-01-03', '%a', 'pt_BR'), 'Ter', 'Tue')
    assert(tz('2006-01-04', '%a', 'pt_BR'), 'Qua', 'Wed')
    assert(tz('2006-01-05', '%a', 'pt_BR'), 'Qui', 'Thu')
    assert(tz('2006-01-06', '%a', 'pt_BR'), 'Sex', 'Fri')
    assert(tz('2006-01-07', '%a', 'pt_BR'), 'Sáb', 'Sat')

    // pt_BR days of week
    assert(tz('2006-01-01', '%A', 'pt_BR'), 'domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'pt_BR'), 'segunda', 'Monday')
    assert(tz('2006-01-03', '%A', 'pt_BR'), 'terça', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'pt_BR'), 'quarta', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'pt_BR'), 'quinta', 'Thursday')
    assert(tz('2006-01-06', '%A', 'pt_BR'), 'sexta', 'Friday')
    assert(tz('2006-01-07', '%A', 'pt_BR'), 'sábado', 'Saturday')
})
