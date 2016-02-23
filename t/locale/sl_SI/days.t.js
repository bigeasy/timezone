require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/sl_SI'))

    // sl_SI abbreviated days of week
    assert(tz('2006-01-01', '%a', 'sl_SI'), 'ned', 'Sun')
    assert(tz('2006-01-02', '%a', 'sl_SI'), 'pon', 'Mon')
    assert(tz('2006-01-03', '%a', 'sl_SI'), 'tor', 'Tue')
    assert(tz('2006-01-04', '%a', 'sl_SI'), 'sre', 'Wed')
    assert(tz('2006-01-05', '%a', 'sl_SI'), 'čet', 'Thu')
    assert(tz('2006-01-06', '%a', 'sl_SI'), 'pet', 'Fri')
    assert(tz('2006-01-07', '%a', 'sl_SI'), 'sob', 'Sat')

    // sl_SI days of week
    assert(tz('2006-01-01', '%A', 'sl_SI'), 'nedelja', 'Sunday')
    assert(tz('2006-01-02', '%A', 'sl_SI'), 'ponedeljek', 'Monday')
    assert(tz('2006-01-03', '%A', 'sl_SI'), 'torek', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'sl_SI'), 'sreda', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'sl_SI'), 'četrtek', 'Thursday')
    assert(tz('2006-01-06', '%A', 'sl_SI'), 'petek', 'Friday')
    assert(tz('2006-01-07', '%A', 'sl_SI'), 'sobota', 'Saturday')
})
