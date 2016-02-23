require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/zh_TW'))

    // zh_TW abbreviated days of week
    assert(tz('2006-01-01', '%a', 'zh_TW'), '日', 'Sun')
    assert(tz('2006-01-02', '%a', 'zh_TW'), '一', 'Mon')
    assert(tz('2006-01-03', '%a', 'zh_TW'), '二', 'Tue')
    assert(tz('2006-01-04', '%a', 'zh_TW'), '三', 'Wed')
    assert(tz('2006-01-05', '%a', 'zh_TW'), '四', 'Thu')
    assert(tz('2006-01-06', '%a', 'zh_TW'), '五', 'Fri')
    assert(tz('2006-01-07', '%a', 'zh_TW'), '六', 'Sat')

    // zh_TW days of week
    assert(tz('2006-01-01', '%A', 'zh_TW'), '週日', 'Sunday')
    assert(tz('2006-01-02', '%A', 'zh_TW'), '週一', 'Monday')
    assert(tz('2006-01-03', '%A', 'zh_TW'), '週二', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'zh_TW'), '週三', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'zh_TW'), '週四', 'Thursday')
    assert(tz('2006-01-06', '%A', 'zh_TW'), '週五', 'Friday')
    assert(tz('2006-01-07', '%A', 'zh_TW'), '週六', 'Saturday')
})
