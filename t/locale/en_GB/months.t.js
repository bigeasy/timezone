require('proof')(24, function (assert) {
    var tz = require('timezone')(require('timezone/en_GB'))

    // en_GB abbreviated months
    assert(tz('2000-01-01', '%b', 'en_GB'), 'Jan', 'Jan')
    assert(tz('2000-02-01', '%b', 'en_GB'), 'Feb', 'Feb')
    assert(tz('2000-03-01', '%b', 'en_GB'), 'Mar', 'Mar')
    assert(tz('2000-04-01', '%b', 'en_GB'), 'Apr', 'Apr')
    assert(tz('2000-05-01', '%b', 'en_GB'), 'May', 'May')
    assert(tz('2000-06-01', '%b', 'en_GB'), 'Jun', 'Jun')
    assert(tz('2000-07-01', '%b', 'en_GB'), 'Jul', 'Jul')
    assert(tz('2000-08-01', '%b', 'en_GB'), 'Aug', 'Aug')
    assert(tz('2000-09-01', '%b', 'en_GB'), 'Sep', 'Sep')
    assert(tz('2000-10-01', '%b', 'en_GB'), 'Oct', 'Oct')
    assert(tz('2000-11-01', '%b', 'en_GB'), 'Nov', 'Nov')
    assert(tz('2000-12-01', '%b', 'en_GB'), 'Dec', 'Dec')

    // ' + name + ' months
    assert(tz('2000-01-01', '%B', 'en_GB'), 'January', 'January')
    assert(tz('2000-02-01', '%B', 'en_GB'), 'February', 'February')
    assert(tz('2000-03-01', '%B', 'en_GB'), 'March', 'March')
    assert(tz('2000-04-01', '%B', 'en_GB'), 'April', 'April')
    assert(tz('2000-05-01', '%B', 'en_GB'), 'May', 'May')
    assert(tz('2000-06-01', '%B', 'en_GB'), 'June', 'June')
    assert(tz('2000-07-01', '%B', 'en_GB'), 'July', 'July')
    assert(tz('2000-08-01', '%B', 'en_GB'), 'August', 'August')
    assert(tz('2000-09-01', '%B', 'en_GB'), 'September', 'September')
    assert(tz('2000-10-01', '%B', 'en_GB'), 'October', 'October')
    assert(tz('2000-11-01', '%B', 'en_GB'), 'November', 'November')
    assert(tz('2000-12-01', '%B', 'en_GB'), 'December', 'December')
})
