require('proof')(4, function (assert) {
    var tz = require('timezone')(require('timezone/bn_IN'))

    // bn_IN meridiem upper case
    assert(tz('2000-09-03 08:05:04', '%P', 'bn_IN'), 'পূর্বাহ্ণ', 'ante meridiem lower case')
    assert(tz('2000-09-03 23:05:04', '%P', 'bn_IN'), 'অপরাহ্ণ', 'post meridiem lower case')

    // bn_IN meridiem lower case
    assert(tz('2000-09-03 08:05:04', '%p', 'bn_IN'), 'পূর্বাহ্ণ', 'ante meridiem upper case')
    assert(tz('2000-09-03 23:05:04', '%p', 'bn_IN'), 'অপরাহ্ণ', 'post meridiem upper case')
})
