require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/ta_IN'))

    // ta_IN date representation
    assert(tz('2000-09-03', '%x', 'ta_IN'), 'ஞாயிறு 03 செப்டம்பர் 2000', 'date format')

    // ta_IN time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'ta_IN'), '08:05:04  UTC', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'ta_IN'), '11:05:04  UTC', 'long time format evening')

    // ta_IN date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'ta_IN'), 'ஞாயிறு 03 செப்டம்பர் 2000 08:05:04 காலை UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'ta_IN'), 'ஞாயிறு 03 செப்டம்பர் 2000 11:05:04 மாலை UTC', 'long date format evening')
})
