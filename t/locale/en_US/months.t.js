require('proof')(24, function (assert) {
    var tz = require('timezone')(require('timezone/en_US'))

    // en_US abbreviated months
    assert(tz('2000-01-01', '%b', 'en_US'), 'Jan', 'Jan')
    assert(tz('2000-02-01', '%b', 'en_US'), 'Feb', 'Feb')
    assert(tz('2000-03-01', '%b', 'en_US'), 'Mar', 'Mar')
    assert(tz('2000-04-01', '%b', 'en_US'), 'Apr', 'Apr')
    assert(tz('2000-05-01', '%b', 'en_US'), 'May', 'May')
    assert(tz('2000-06-01', '%b', 'en_US'), 'Jun', 'Jun')
    assert(tz('2000-07-01', '%b', 'en_US'), 'Jul', 'Jul')
    assert(tz('2000-08-01', '%b', 'en_US'), 'Aug', 'Aug')
    assert(tz('2000-09-01', '%b', 'en_US'), 'Sep', 'Sep')
    assert(tz('2000-10-01', '%b', 'en_US'), 'Oct', 'Oct')
    assert(tz('2000-11-01', '%b', 'en_US'), 'Nov', 'Nov')
    assert(tz('2000-12-01', '%b', 'en_US'), 'Dec', 'Dec')

    // ' + name + ' months
    assert(tz('2000-01-01', '%B', 'en_US'), 'January', 'January')
    assert(tz('2000-02-01', '%B', 'en_US'), 'February', 'February')
    assert(tz('2000-03-01', '%B', 'en_US'), 'March', 'March')
    assert(tz('2000-04-01', '%B', 'en_US'), 'April', 'April')
    assert(tz('2000-05-01', '%B', 'en_US'), 'May', 'May')
    assert(tz('2000-06-01', '%B', 'en_US'), 'June', 'June')
    assert(tz('2000-07-01', '%B', 'en_US'), 'July', 'July')
    assert(tz('2000-08-01', '%B', 'en_US'), 'August', 'August')
    assert(tz('2000-09-01', '%B', 'en_US'), 'September', 'September')
    assert(tz('2000-10-01', '%B', 'en_US'), 'October', 'October')
    assert(tz('2000-11-01', '%B', 'en_US'), 'November', 'November')
    assert(tz('2000-12-01', '%B', 'en_US'), 'December', 'December')
})
