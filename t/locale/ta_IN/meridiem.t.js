require('proof')(4, function (assert) {
    var tz = require('timezone')(require('timezone/ta_IN'))

    // ta_IN meridiem upper case
    assert(tz('2000-09-03 08:05:04', '%P', 'ta_IN'), 'காலை', 'ante meridiem lower case')
    assert(tz('2000-09-03 23:05:04', '%P', 'ta_IN'), 'மாலை', 'post meridiem lower case')

    // ta_IN meridiem lower case
    assert(tz('2000-09-03 08:05:04', '%p', 'ta_IN'), 'காலை', 'ante meridiem upper case')
    assert(tz('2000-09-03 23:05:04', '%p', 'ta_IN'), 'மாலை', 'post meridiem upper case')
})
