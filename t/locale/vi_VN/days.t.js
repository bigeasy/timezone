require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/vi_VN'))

    // vi_VN abbreviated days of week
    assert(tz('2006-01-01', '%a', 'vi_VN'), 'CN', 'Sun')
    assert(tz('2006-01-02', '%a', 'vi_VN'), 'T2', 'Mon')
    assert(tz('2006-01-03', '%a', 'vi_VN'), 'T3', 'Tue')
    assert(tz('2006-01-04', '%a', 'vi_VN'), 'T4', 'Wed')
    assert(tz('2006-01-05', '%a', 'vi_VN'), 'T5', 'Thu')
    assert(tz('2006-01-06', '%a', 'vi_VN'), 'T6', 'Fri')
    assert(tz('2006-01-07', '%a', 'vi_VN'), 'T7', 'Sat')

    // vi_VN days of week
    assert(tz('2006-01-01', '%A', 'vi_VN'), 'Chủ nhật', 'Sunday')
    assert(tz('2006-01-02', '%A', 'vi_VN'), 'Thứ hai', 'Monday')
    assert(tz('2006-01-03', '%A', 'vi_VN'), 'Thứ ba', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'vi_VN'), 'Thứ tư', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'vi_VN'), 'Thứ năm', 'Thursday')
    assert(tz('2006-01-06', '%A', 'vi_VN'), 'Thứ sáu', 'Friday')
    assert(tz('2006-01-07', '%A', 'vi_VN'), 'Thứ bảy', 'Saturday')
})
