require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/hi_IN'))

    // hi_IN abbreviated days of week
    assert(tz('2006-01-01', '%a', 'hi_IN'), 'रवि ', 'Sun')
    assert(tz('2006-01-02', '%a', 'hi_IN'), 'सोम ', 'Mon')
    assert(tz('2006-01-03', '%a', 'hi_IN'), 'मंगल ', 'Tue')
    assert(tz('2006-01-04', '%a', 'hi_IN'), 'बुध ', 'Wed')
    assert(tz('2006-01-05', '%a', 'hi_IN'), 'गुरु ', 'Thu')
    assert(tz('2006-01-06', '%a', 'hi_IN'), 'शुक्र ', 'Fri')
    assert(tz('2006-01-07', '%a', 'hi_IN'), 'शनि ', 'Sat')

    // hi_IN days of week
    assert(tz('2006-01-01', '%A', 'hi_IN'), 'रविवार ', 'Sunday')
    assert(tz('2006-01-02', '%A', 'hi_IN'), 'सोमवार ', 'Monday')
    assert(tz('2006-01-03', '%A', 'hi_IN'), 'मंगलवार ', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'hi_IN'), 'बुधवार ', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'hi_IN'), 'गुरुवार ', 'Thursday')
    assert(tz('2006-01-06', '%A', 'hi_IN'), 'शुक्रवार ', 'Friday')
    assert(tz('2006-01-07', '%A', 'hi_IN'), 'शनिवार ', 'Saturday')
})
