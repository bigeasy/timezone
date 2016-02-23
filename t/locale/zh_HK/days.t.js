require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/zh_HK'))

    // zh_HK abbreviated days of week
    assert(tz('2006-01-01', '%a', 'zh_HK'), '日', 'Sun')
    assert(tz('2006-01-02', '%a', 'zh_HK'), '一', 'Mon')
    assert(tz('2006-01-03', '%a', 'zh_HK'), '二', 'Tue')
    assert(tz('2006-01-04', '%a', 'zh_HK'), '三', 'Wed')
    assert(tz('2006-01-05', '%a', 'zh_HK'), '四', 'Thu')
    assert(tz('2006-01-06', '%a', 'zh_HK'), '五', 'Fri')
    assert(tz('2006-01-07', '%a', 'zh_HK'), '六', 'Sat')

    // zh_HK days of week
    assert(tz('2006-01-01', '%A', 'zh_HK'), '星期日', 'Sunday')
    assert(tz('2006-01-02', '%A', 'zh_HK'), '星期一', 'Monday')
    assert(tz('2006-01-03', '%A', 'zh_HK'), '星期二', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'zh_HK'), '星期三', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'zh_HK'), '星期四', 'Thursday')
    assert(tz('2006-01-06', '%A', 'zh_HK'), '星期五', 'Friday')
    assert(tz('2006-01-07', '%A', 'zh_HK'), '星期六', 'Saturday')
})
