require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/ja_JP'))

    // ja_JP abbreviated days of week
    assert(tz('2006-01-01', '%a', 'ja_JP'), '日', 'Sun')
    assert(tz('2006-01-02', '%a', 'ja_JP'), '月', 'Mon')
    assert(tz('2006-01-03', '%a', 'ja_JP'), '火', 'Tue')
    assert(tz('2006-01-04', '%a', 'ja_JP'), '水', 'Wed')
    assert(tz('2006-01-05', '%a', 'ja_JP'), '木', 'Thu')
    assert(tz('2006-01-06', '%a', 'ja_JP'), '金', 'Fri')
    assert(tz('2006-01-07', '%a', 'ja_JP'), '土', 'Sat')

    // ja_JP days of week
    assert(tz('2006-01-01', '%A', 'ja_JP'), '日曜日', 'Sunday')
    assert(tz('2006-01-02', '%A', 'ja_JP'), '月曜日', 'Monday')
    assert(tz('2006-01-03', '%A', 'ja_JP'), '火曜日', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'ja_JP'), '水曜日', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'ja_JP'), '木曜日', 'Thursday')
    assert(tz('2006-01-06', '%A', 'ja_JP'), '金曜日', 'Friday')
    assert(tz('2006-01-07', '%A', 'ja_JP'), '土曜日', 'Saturday')
})
