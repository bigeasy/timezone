require('proof')(4, function (assert) {
    var tz = require('timezone')(require('timezone/si_LK'))

    // si_LK meridiem upper case
    assert(tz('2000-09-03 08:05:04', '%P', 'si_LK'), 'පෙ.ව.', 'ante meridiem lower case')
    assert(tz('2000-09-03 23:05:04', '%P', 'si_LK'), 'ප.ව.', 'post meridiem lower case')

    // si_LK meridiem lower case
    assert(tz('2000-09-03 08:05:04', '%p', 'si_LK'), 'පෙ.ව.', 'ante meridiem upper case')
    assert(tz('2000-09-03 23:05:04', '%p', 'si_LK'), 'ප.ව.', 'post meridiem upper case')
})
