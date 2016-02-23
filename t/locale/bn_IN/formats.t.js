require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/bn_IN'))

    // bn_IN date representation
    assert(tz('2000-09-03', '%x', 'bn_IN'), 'রবিবার 03 সেপ্টেম্বর 2000', 'date format')

    // bn_IN time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'bn_IN'), '08:05:04  UTC', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'bn_IN'), '11:05:04  UTC', 'long time format evening')

    // bn_IN date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'bn_IN'), 'রবিবার 03 সেপ্টেম্বর 2000 08:05:04 পূর্বাহ্ণ UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'bn_IN'), 'রবিবার 03 সেপ্টেম্বর 2000 11:05:04 অপরাহ্ণ UTC', 'long date format evening')
})
