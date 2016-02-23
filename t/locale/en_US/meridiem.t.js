require('proof')(4, function (assert) {
    var tz = require('timezone')(require('timezone/en_US'))

    // en_US meridiem upper case
    assert(tz('2000-09-03 08:05:04', '%P', 'en_US'), 'am', 'ante meridiem lower case')
    assert(tz('2000-09-03 23:05:04', '%P', 'en_US'), 'pm', 'post meridiem lower case')

    // en_US meridiem lower case
    assert(tz('2000-09-03 08:05:04', '%p', 'en_US'), 'AM', 'ante meridiem upper case')
    assert(tz('2000-09-03 23:05:04', '%p', 'en_US'), 'PM', 'post meridiem upper case')
})
