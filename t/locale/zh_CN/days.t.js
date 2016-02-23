require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/zh_CN'))

    // zh_CN abbreviated days of week
    assert(tz('2006-01-01', '%a', 'zh_CN'), '日', 'Sun')
    assert(tz('2006-01-02', '%a', 'zh_CN'), '一', 'Mon')
    assert(tz('2006-01-03', '%a', 'zh_CN'), '二', 'Tue')
    assert(tz('2006-01-04', '%a', 'zh_CN'), '三', 'Wed')
    assert(tz('2006-01-05', '%a', 'zh_CN'), '四', 'Thu')
    assert(tz('2006-01-06', '%a', 'zh_CN'), '五', 'Fri')
    assert(tz('2006-01-07', '%a', 'zh_CN'), '六', 'Sat')

    // zh_CN days of week
    assert(tz('2006-01-01', '%A', 'zh_CN'), '星期日', 'Sunday')
    assert(tz('2006-01-02', '%A', 'zh_CN'), '星期一', 'Monday')
    assert(tz('2006-01-03', '%A', 'zh_CN'), '星期二', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'zh_CN'), '星期三', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'zh_CN'), '星期四', 'Thursday')
    assert(tz('2006-01-06', '%A', 'zh_CN'), '星期五', 'Friday')
    assert(tz('2006-01-07', '%A', 'zh_CN'), '星期六', 'Saturday')
})
