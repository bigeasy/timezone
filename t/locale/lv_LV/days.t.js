require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/lv_LV'))

    // lv_LV abbreviated days of week
    assert(tz('2006-01-01', '%a', 'lv_LV'), 'Sv', 'Sun')
    assert(tz('2006-01-02', '%a', 'lv_LV'), 'P ', 'Mon')
    assert(tz('2006-01-03', '%a', 'lv_LV'), 'O ', 'Tue')
    assert(tz('2006-01-04', '%a', 'lv_LV'), 'T ', 'Wed')
    assert(tz('2006-01-05', '%a', 'lv_LV'), 'C ', 'Thu')
    assert(tz('2006-01-06', '%a', 'lv_LV'), 'Pk', 'Fri')
    assert(tz('2006-01-07', '%a', 'lv_LV'), 'S ', 'Sat')

    // lv_LV days of week
    assert(tz('2006-01-01', '%A', 'lv_LV'), 'svētdiena', 'Sunday')
    assert(tz('2006-01-02', '%A', 'lv_LV'), 'pirmdiena', 'Monday')
    assert(tz('2006-01-03', '%A', 'lv_LV'), 'otrdiena', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'lv_LV'), 'trešdiena', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'lv_LV'), 'ceturtdiena', 'Thursday')
    assert(tz('2006-01-06', '%A', 'lv_LV'), 'piektdiena', 'Friday')
    assert(tz('2006-01-07', '%A', 'lv_LV'), 'sestdiena', 'Saturday')
})
