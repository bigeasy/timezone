require('proof')(24, function (assert) {
    var tz = require('timezone')(require('timezone/ko_KR'))

    // ko_KR abbreviated months
    assert(tz('2000-01-01', '%b', 'ko_KR'), ' 1월', 'Jan')
    assert(tz('2000-02-01', '%b', 'ko_KR'), ' 2월', 'Feb')
    assert(tz('2000-03-01', '%b', 'ko_KR'), ' 3월', 'Mar')
    assert(tz('2000-04-01', '%b', 'ko_KR'), ' 4월', 'Apr')
    assert(tz('2000-05-01', '%b', 'ko_KR'), ' 5월', 'May')
    assert(tz('2000-06-01', '%b', 'ko_KR'), ' 6월', 'Jun')
    assert(tz('2000-07-01', '%b', 'ko_KR'), ' 7월', 'Jul')
    assert(tz('2000-08-01', '%b', 'ko_KR'), ' 8월', 'Aug')
    assert(tz('2000-09-01', '%b', 'ko_KR'), ' 9월', 'Sep')
    assert(tz('2000-10-01', '%b', 'ko_KR'), '10월', 'Oct')
    assert(tz('2000-11-01', '%b', 'ko_KR'), '11월', 'Nov')
    assert(tz('2000-12-01', '%b', 'ko_KR'), '12월', 'Dec')

    // ' + name + ' months
    assert(tz('2000-01-01', '%B', 'ko_KR'), '1월', 'January')
    assert(tz('2000-02-01', '%B', 'ko_KR'), '2월', 'February')
    assert(tz('2000-03-01', '%B', 'ko_KR'), '3월', 'March')
    assert(tz('2000-04-01', '%B', 'ko_KR'), '4월', 'April')
    assert(tz('2000-05-01', '%B', 'ko_KR'), '5월', 'May')
    assert(tz('2000-06-01', '%B', 'ko_KR'), '6월', 'June')
    assert(tz('2000-07-01', '%B', 'ko_KR'), '7월', 'July')
    assert(tz('2000-08-01', '%B', 'ko_KR'), '8월', 'August')
    assert(tz('2000-09-01', '%B', 'ko_KR'), '9월', 'September')
    assert(tz('2000-10-01', '%B', 'ko_KR'), '10월', 'October')
    assert(tz('2000-11-01', '%B', 'ko_KR'), '11월', 'November')
    assert(tz('2000-12-01', '%B', 'ko_KR'), '12월', 'December')
})
