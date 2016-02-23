require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/gl_ES'))

    // gl_ES abbreviated days of week
    assert(tz('2006-01-01', '%a', 'gl_ES'), 'Dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'gl_ES'), 'Lun', 'Mon')
    assert(tz('2006-01-03', '%a', 'gl_ES'), 'Mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'gl_ES'), 'Mér', 'Wed')
    assert(tz('2006-01-05', '%a', 'gl_ES'), 'Xov', 'Thu')
    assert(tz('2006-01-06', '%a', 'gl_ES'), 'Ven', 'Fri')
    assert(tz('2006-01-07', '%a', 'gl_ES'), 'Sáb', 'Sat')

    // gl_ES days of week
    assert(tz('2006-01-01', '%A', 'gl_ES'), 'Domingo', 'Sunday')
    assert(tz('2006-01-02', '%A', 'gl_ES'), 'Luns', 'Monday')
    assert(tz('2006-01-03', '%A', 'gl_ES'), 'Martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'gl_ES'), 'Mércores', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'gl_ES'), 'Xoves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'gl_ES'), 'Venres', 'Friday')
    assert(tz('2006-01-07', '%A', 'gl_ES'), 'Sábado', 'Saturday')
})
