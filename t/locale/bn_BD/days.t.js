require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/bn_BD'))

    // bn_BD abbreviated days of week
    assert(tz('2006-01-01', '%a', 'bn_BD'), 'রবি', 'Sun')
    assert(tz('2006-01-02', '%a', 'bn_BD'), 'সোম', 'Mon')
    assert(tz('2006-01-03', '%a', 'bn_BD'), 'মঙ্গল', 'Tue')
    assert(tz('2006-01-04', '%a', 'bn_BD'), 'বুধ', 'Wed')
    assert(tz('2006-01-05', '%a', 'bn_BD'), 'বৃহঃ', 'Thu')
    assert(tz('2006-01-06', '%a', 'bn_BD'), 'শুক্র', 'Fri')
    assert(tz('2006-01-07', '%a', 'bn_BD'), 'শনি', 'Sat')

    // bn_BD days of week
    assert(tz('2006-01-01', '%A', 'bn_BD'), 'রবিবার', 'Sunday')
    assert(tz('2006-01-02', '%A', 'bn_BD'), 'সোমবার', 'Monday')
    assert(tz('2006-01-03', '%A', 'bn_BD'), 'মঙ্গলবার', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'bn_BD'), 'বুধবার', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'bn_BD'), 'বৃহস্পতিবার', 'Thursday')
    assert(tz('2006-01-06', '%A', 'bn_BD'), 'শুক্রবার', 'Friday')
    assert(tz('2006-01-07', '%A', 'bn_BD'), 'শনিবার', 'Saturday')
})
