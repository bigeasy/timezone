require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/ja_JP'))

    // ja_JP date representation
    assert(tz('2000-09-03', '%x', 'ja_JP'), '2000年09月03日', 'date format')

    // ja_JP time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'ja_JP'), '08時05分04秒', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'ja_JP'), '23時05分04秒', 'long time format evening')

    // ja_JP date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'ja_JP'), '2000年09月03日 08時05分04秒', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'ja_JP'), '2000年09月03日 23時05分04秒', 'long date format evening')
})
