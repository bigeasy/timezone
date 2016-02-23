require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/sq_AL'))

    // sq_AL abbreviated days of week
    assert(tz('2006-01-01', '%a', 'sq_AL'), 'Die ', 'Sun')
    assert(tz('2006-01-02', '%a', 'sq_AL'), 'Hën ', 'Mon')
    assert(tz('2006-01-03', '%a', 'sq_AL'), 'Mar ', 'Tue')
    assert(tz('2006-01-04', '%a', 'sq_AL'), 'Mër ', 'Wed')
    assert(tz('2006-01-05', '%a', 'sq_AL'), 'Enj ', 'Thu')
    assert(tz('2006-01-06', '%a', 'sq_AL'), 'Pre ', 'Fri')
    assert(tz('2006-01-07', '%a', 'sq_AL'), 'Sht ', 'Sat')

    // sq_AL days of week
    assert(tz('2006-01-01', '%A', 'sq_AL'), 'e diel ', 'Sunday')
    assert(tz('2006-01-02', '%A', 'sq_AL'), 'e hënë ', 'Monday')
    assert(tz('2006-01-03', '%A', 'sq_AL'), 'e martë ', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'sq_AL'), 'e mërkurë ', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'sq_AL'), 'e enjte ', 'Thursday')
    assert(tz('2006-01-06', '%A', 'sq_AL'), 'e premte ', 'Friday')
    assert(tz('2006-01-07', '%A', 'sq_AL'), 'e shtunë ', 'Saturday')
})
