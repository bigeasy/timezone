require('proof')(4, function (assert) {
    var tz = require('timezone')(require('timezone/ko_KR'))

    // ko_KR meridiem upper case
    assert(tz('2000-09-03 08:05:04', '%P', 'ko_KR'), '오전', 'ante meridiem lower case')
    assert(tz('2000-09-03 23:05:04', '%P', 'ko_KR'), '오후', 'post meridiem lower case')

    // ko_KR meridiem lower case
    assert(tz('2000-09-03 08:05:04', '%p', 'ko_KR'), '오전', 'ante meridiem upper case')
    assert(tz('2000-09-03 23:05:04', '%p', 'ko_KR'), '오후', 'post meridiem upper case')
})
