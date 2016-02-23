require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/sr_RS'))

    // sr_RS abbreviated days of week
    assert(tz('2006-01-01', '%a', 'sr_RS'), 'нед', 'Sun')
    assert(tz('2006-01-02', '%a', 'sr_RS'), 'пон', 'Mon')
    assert(tz('2006-01-03', '%a', 'sr_RS'), 'уто', 'Tue')
    assert(tz('2006-01-04', '%a', 'sr_RS'), 'сре', 'Wed')
    assert(tz('2006-01-05', '%a', 'sr_RS'), 'чет', 'Thu')
    assert(tz('2006-01-06', '%a', 'sr_RS'), 'пет', 'Fri')
    assert(tz('2006-01-07', '%a', 'sr_RS'), 'суб', 'Sat')

    // sr_RS days of week
    assert(tz('2006-01-01', '%A', 'sr_RS'), 'недеља', 'Sunday')
    assert(tz('2006-01-02', '%A', 'sr_RS'), 'понедељак', 'Monday')
    assert(tz('2006-01-03', '%A', 'sr_RS'), 'уторак', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'sr_RS'), 'среда', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'sr_RS'), 'четвртак', 'Thursday')
    assert(tz('2006-01-06', '%A', 'sr_RS'), 'петак', 'Friday')
    assert(tz('2006-01-07', '%A', 'sr_RS'), 'субота', 'Saturday')
})
