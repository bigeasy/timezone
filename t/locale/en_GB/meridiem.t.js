require('proof')(4, function (assert) {
    var tz = require('timezone')(require('timezone/en_GB'))

    // en_GB meridiem upper case
    assert(tz('2000-09-03 08:05:04', '%P', 'en_GB'), 'am', 'ante meridiem lower case')
    assert(tz('2000-09-03 23:05:04', '%P', 'en_GB'), 'pm', 'post meridiem lower case')

    // en_GB meridiem lower case
    assert(tz('2000-09-03 08:05:04', '%p', 'en_GB'), 'AM', 'ante meridiem upper case')
    assert(tz('2000-09-03 23:05:04', '%p', 'en_GB'), 'PM', 'post meridiem upper case')
})
