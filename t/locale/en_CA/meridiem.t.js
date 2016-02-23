require('proof')(4, function (assert) {
    var tz = require('timezone')(require('timezone/en_CA'))

    // en_CA meridiem upper case
    assert(tz('2000-09-03 08:05:04', '%P', 'en_CA'), 'am', 'ante meridiem lower case')
    assert(tz('2000-09-03 23:05:04', '%P', 'en_CA'), 'pm', 'post meridiem lower case')

    // en_CA meridiem lower case
    assert(tz('2000-09-03 08:05:04', '%p', 'en_CA'), 'AM', 'ante meridiem upper case')
    assert(tz('2000-09-03 23:05:04', '%p', 'en_CA'), 'PM', 'post meridiem upper case')
})
