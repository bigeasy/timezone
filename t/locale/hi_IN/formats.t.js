require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/hi_IN'))

    // hi_IN date representation
    assert(tz('2000-09-03', '%x', 'hi_IN'), 'रविवार  03 सितम्बर 2000', 'date format')

    // hi_IN time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'hi_IN'), '08:05:04  UTC', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'hi_IN'), '11:05:04  UTC', 'long time format evening')

    // hi_IN date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'hi_IN'), 'रविवार  03 सितम्बर 2000 08:05:04 पूर्वाह्न UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'hi_IN'), 'रविवार  03 सितम्बर 2000 11:05:04 अपराह्न UTC', 'long date format evening')
})
