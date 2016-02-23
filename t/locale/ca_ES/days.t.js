require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/ca_ES'))

    // ca_ES abbreviated days of week
    assert(tz('2006-01-01', '%a', 'ca_ES'), 'dg', 'Sun')
    assert(tz('2006-01-02', '%a', 'ca_ES'), 'dl', 'Mon')
    assert(tz('2006-01-03', '%a', 'ca_ES'), 'dt', 'Tue')
    assert(tz('2006-01-04', '%a', 'ca_ES'), 'dc', 'Wed')
    assert(tz('2006-01-05', '%a', 'ca_ES'), 'dj', 'Thu')
    assert(tz('2006-01-06', '%a', 'ca_ES'), 'dv', 'Fri')
    assert(tz('2006-01-07', '%a', 'ca_ES'), 'ds', 'Sat')

    // ca_ES days of week
    assert(tz('2006-01-01', '%A', 'ca_ES'), 'diumenge', 'Sunday')
    assert(tz('2006-01-02', '%A', 'ca_ES'), 'dilluns', 'Monday')
    assert(tz('2006-01-03', '%A', 'ca_ES'), 'dimarts', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'ca_ES'), 'dimecres', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'ca_ES'), 'dijous', 'Thursday')
    assert(tz('2006-01-06', '%A', 'ca_ES'), 'divendres', 'Friday')
    assert(tz('2006-01-07', '%A', 'ca_ES'), 'dissabte', 'Saturday')
})
