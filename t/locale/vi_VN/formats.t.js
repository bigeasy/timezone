require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/vi_VN'))

    // vi_VN date representation
    assert(tz('2000-09-03', '%x', 'vi_VN'), '03/09/2000', 'date format')

    // vi_VN time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'vi_VN'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'vi_VN'), '23:05:04', 'long time format evening')

    // vi_VN date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'vi_VN'), 'Chủ nhật, 03 Tháng chín Năm 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'vi_VN'), 'Chủ nhật, 03 Tháng chín Năm 2000 23:05:04 UTC', 'long date format evening')
})
