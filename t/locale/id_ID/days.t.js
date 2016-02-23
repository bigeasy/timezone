require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/id_ID'))

    // id_ID abbreviated days of week
    assert(tz('2006-01-01', '%a', 'id_ID'), 'Min', 'Sun')
    assert(tz('2006-01-02', '%a', 'id_ID'), 'Sen', 'Mon')
    assert(tz('2006-01-03', '%a', 'id_ID'), 'Sel', 'Tue')
    assert(tz('2006-01-04', '%a', 'id_ID'), 'Rab', 'Wed')
    assert(tz('2006-01-05', '%a', 'id_ID'), 'Kam', 'Thu')
    assert(tz('2006-01-06', '%a', 'id_ID'), 'Jum', 'Fri')
    assert(tz('2006-01-07', '%a', 'id_ID'), 'Sab', 'Sat')

    // id_ID days of week
    assert(tz('2006-01-01', '%A', 'id_ID'), 'Minggu', 'Sunday')
    assert(tz('2006-01-02', '%A', 'id_ID'), 'Senin', 'Monday')
    assert(tz('2006-01-03', '%A', 'id_ID'), 'Selasa', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'id_ID'), 'Rabu', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'id_ID'), 'Kamis', 'Thursday')
    assert(tz('2006-01-06', '%A', 'id_ID'), 'Jumat', 'Friday')
    assert(tz('2006-01-07', '%A', 'id_ID'), 'Sabtu', 'Saturday')
})
