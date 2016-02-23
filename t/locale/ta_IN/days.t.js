require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/ta_IN'))

    // ta_IN abbreviated days of week
    assert(tz('2006-01-01', '%a', 'ta_IN'), 'ஞா', 'Sun')
    assert(tz('2006-01-02', '%a', 'ta_IN'), 'தி', 'Mon')
    assert(tz('2006-01-03', '%a', 'ta_IN'), 'செ', 'Tue')
    assert(tz('2006-01-04', '%a', 'ta_IN'), 'பு', 'Wed')
    assert(tz('2006-01-05', '%a', 'ta_IN'), 'வி', 'Thu')
    assert(tz('2006-01-06', '%a', 'ta_IN'), 'வெ', 'Fri')
    assert(tz('2006-01-07', '%a', 'ta_IN'), 'ச', 'Sat')

    // ta_IN days of week
    assert(tz('2006-01-01', '%A', 'ta_IN'), 'ஞாயிறு', 'Sunday')
    assert(tz('2006-01-02', '%A', 'ta_IN'), 'திங்கள்', 'Monday')
    assert(tz('2006-01-03', '%A', 'ta_IN'), 'செவ்வாய்', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'ta_IN'), 'புதன்', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'ta_IN'), 'வியாழன்', 'Thursday')
    assert(tz('2006-01-06', '%A', 'ta_IN'), 'வெள்ளி', 'Friday')
    assert(tz('2006-01-07', '%A', 'ta_IN'), 'சனி', 'Saturday')
})
