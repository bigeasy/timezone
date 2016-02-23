require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/bn_IN'))

    // bn_IN abbreviated days of week
    assert(tz('2006-01-01', '%a', 'bn_IN'), 'রবি', 'Sun')
    assert(tz('2006-01-02', '%a', 'bn_IN'), 'সোম', 'Mon')
    assert(tz('2006-01-03', '%a', 'bn_IN'), 'মঙ্গল', 'Tue')
    assert(tz('2006-01-04', '%a', 'bn_IN'), 'বুধ', 'Wed')
    assert(tz('2006-01-05', '%a', 'bn_IN'), 'বৃহস্পতি', 'Thu')
    assert(tz('2006-01-06', '%a', 'bn_IN'), 'শুক্র', 'Fri')
    assert(tz('2006-01-07', '%a', 'bn_IN'), 'শনি', 'Sat')

    // bn_IN days of week
    assert(tz('2006-01-01', '%A', 'bn_IN'), 'রবিবার', 'Sunday')
    assert(tz('2006-01-02', '%A', 'bn_IN'), 'সোমবার', 'Monday')
    assert(tz('2006-01-03', '%A', 'bn_IN'), 'মঙ্গলবার', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'bn_IN'), 'বুধবার', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'bn_IN'), 'বৃহস্পতিবার', 'Thursday')
    assert(tz('2006-01-06', '%A', 'bn_IN'), 'শুক্রবার', 'Friday')
    assert(tz('2006-01-07', '%A', 'bn_IN'), 'শনিবার', 'Saturday')
})
