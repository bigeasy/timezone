require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/it_CH'))

    // it_CH abbreviated days of week
    assert(tz('2006-01-01', '%a', 'it_CH'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'it_CH'), 'lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'it_CH'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'it_CH'), 'mer', 'Wed')
    assert(tz('2006-01-05', '%a', 'it_CH'), 'gio', 'Thu')
    assert(tz('2006-01-06', '%a', 'it_CH'), 'ven', 'Fri')
    assert(tz('2006-01-07', '%a', 'it_CH'), 'sab', 'Sat')

    // it_CH days of week
    assert(tz('2006-01-01', '%A', 'it_CH'), 'domenica', 'Sunday')
    assert(tz('2006-01-02', '%A', 'it_CH'), 'lunedì', 'Monday')
    assert(tz('2006-01-03', '%A', 'it_CH'), 'martedì', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'it_CH'), 'mercoledì', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'it_CH'), 'giovedì', 'Thursday')
    assert(tz('2006-01-06', '%A', 'it_CH'), 'venerdì', 'Friday')
    assert(tz('2006-01-07', '%A', 'it_CH'), 'sabato', 'Saturday')
})
