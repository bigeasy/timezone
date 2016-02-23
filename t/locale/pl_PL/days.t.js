require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/pl_PL'))

    // pl_PL abbreviated days of week
    assert(tz('2006-01-01', '%a', 'pl_PL'), 'nie', 'Sun')
    assert(tz('2006-01-02', '%a', 'pl_PL'), 'pon', 'Mon')
    assert(tz('2006-01-03', '%a', 'pl_PL'), 'wto', 'Tue')
    assert(tz('2006-01-04', '%a', 'pl_PL'), 'śro', 'Wed')
    assert(tz('2006-01-05', '%a', 'pl_PL'), 'czw', 'Thu')
    assert(tz('2006-01-06', '%a', 'pl_PL'), 'pią', 'Fri')
    assert(tz('2006-01-07', '%a', 'pl_PL'), 'sob', 'Sat')

    // pl_PL days of week
    assert(tz('2006-01-01', '%A', 'pl_PL'), 'niedziela', 'Sunday')
    assert(tz('2006-01-02', '%A', 'pl_PL'), 'poniedziałek', 'Monday')
    assert(tz('2006-01-03', '%A', 'pl_PL'), 'wtorek', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'pl_PL'), 'środa', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'pl_PL'), 'czwartek', 'Thursday')
    assert(tz('2006-01-06', '%A', 'pl_PL'), 'piątek', 'Friday')
    assert(tz('2006-01-07', '%A', 'pl_PL'), 'sobota', 'Saturday')
})
