require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/af_ZA'))

    // af_ZA abbreviated days of week
    assert(tz('2006-01-01', '%a', 'af_ZA'), 'So', 'Sun')
    assert(tz('2006-01-02', '%a', 'af_ZA'), 'Ma', 'Mon')
    assert(tz('2006-01-03', '%a', 'af_ZA'), 'Di', 'Tue')
    assert(tz('2006-01-04', '%a', 'af_ZA'), 'Wo', 'Wed')
    assert(tz('2006-01-05', '%a', 'af_ZA'), 'Do', 'Thu')
    assert(tz('2006-01-06', '%a', 'af_ZA'), 'Vr', 'Fri')
    assert(tz('2006-01-07', '%a', 'af_ZA'), 'Sa', 'Sat')

    // af_ZA days of week
    assert(tz('2006-01-01', '%A', 'af_ZA'), 'Sondag', 'Sunday')
    assert(tz('2006-01-02', '%A', 'af_ZA'), 'Maandag', 'Monday')
    assert(tz('2006-01-03', '%A', 'af_ZA'), 'Dinsdag', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'af_ZA'), 'Woensdag', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'af_ZA'), 'Donderdag', 'Thursday')
    assert(tz('2006-01-06', '%A', 'af_ZA'), 'Vrydag', 'Friday')
    assert(tz('2006-01-07', '%A', 'af_ZA'), 'Saterdag', 'Saturday')
})
