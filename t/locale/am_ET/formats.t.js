require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/am_ET'))

    // am_ET date representation
    assert(tz('2000-09-03', '%x', 'am_ET'), '03/09/2000', 'date format')

    // am_ET time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'am_ET'), ' 8:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'am_ET'), '11:05:04', 'long time format evening')

    // am_ET date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'am_ET'), 'እሑድ፣ ሴፕቴምበር  3 ቀን 2000  8:05:04 ጡዋት UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'am_ET'), 'እሑድ፣ ሴፕቴምበር  3 ቀን 2000 11:05:04 ከሰዓት UTC', 'long date format evening')
})
