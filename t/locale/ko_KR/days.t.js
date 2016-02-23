require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/ko_KR'))

    // ko_KR abbreviated days of week
    assert(tz('2006-01-01', '%a', 'ko_KR'), '일', 'Sun')
    assert(tz('2006-01-02', '%a', 'ko_KR'), '월', 'Mon')
    assert(tz('2006-01-03', '%a', 'ko_KR'), '화', 'Tue')
    assert(tz('2006-01-04', '%a', 'ko_KR'), '수', 'Wed')
    assert(tz('2006-01-05', '%a', 'ko_KR'), '목', 'Thu')
    assert(tz('2006-01-06', '%a', 'ko_KR'), '금', 'Fri')
    assert(tz('2006-01-07', '%a', 'ko_KR'), '토', 'Sat')

    // ko_KR days of week
    assert(tz('2006-01-01', '%A', 'ko_KR'), '일요일', 'Sunday')
    assert(tz('2006-01-02', '%A', 'ko_KR'), '월요일', 'Monday')
    assert(tz('2006-01-03', '%A', 'ko_KR'), '화요일', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'ko_KR'), '수요일', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'ko_KR'), '목요일', 'Thursday')
    assert(tz('2006-01-06', '%A', 'ko_KR'), '금요일', 'Friday')
    assert(tz('2006-01-07', '%A', 'ko_KR'), '토요일', 'Saturday')
})
