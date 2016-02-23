require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/zh_CN'))

    // zh_CN date representation
    assert(tz('2000-09-03', '%x', 'zh_CN'), '2000年09月03日', 'date format')

    // zh_CN time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'zh_CN'), '08时05分04秒', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'zh_CN'), '23时05分04秒', 'long time format evening')

    // zh_CN date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'zh_CN'), '2000年09月03日 星期日 08时05分04秒', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'zh_CN'), '2000年09月03日 星期日 23时05分04秒', 'long date format evening')
})
