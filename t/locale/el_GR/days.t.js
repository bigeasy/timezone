require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/el_GR'))

    // el_GR abbreviated days of week
    assert(tz('2006-01-01', '%a', 'el_GR'), 'Κυρ', 'Sun')
    assert(tz('2006-01-02', '%a', 'el_GR'), 'Δευ', 'Mon')
    assert(tz('2006-01-03', '%a', 'el_GR'), 'Τρι', 'Tue')
    assert(tz('2006-01-04', '%a', 'el_GR'), 'Τετ', 'Wed')
    assert(tz('2006-01-05', '%a', 'el_GR'), 'Πεμ', 'Thu')
    assert(tz('2006-01-06', '%a', 'el_GR'), 'Παρ', 'Fri')
    assert(tz('2006-01-07', '%a', 'el_GR'), 'Σαβ', 'Sat')

    // el_GR days of week
    assert(tz('2006-01-01', '%A', 'el_GR'), 'Κυριακή', 'Sunday')
    assert(tz('2006-01-02', '%A', 'el_GR'), 'Δευτέρα', 'Monday')
    assert(tz('2006-01-03', '%A', 'el_GR'), 'Τρίτη', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'el_GR'), 'Τετάρτη', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'el_GR'), 'Πέμπτη', 'Thursday')
    assert(tz('2006-01-06', '%A', 'el_GR'), 'Παρασκευή', 'Friday')
    assert(tz('2006-01-07', '%A', 'el_GR'), 'Σάββατο', 'Saturday')
})
