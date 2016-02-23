require('proof')(24, function (assert) {
    var tz = require('timezone')(require('timezone/sq_AL'))

    // sq_AL abbreviated months
    assert(tz('2000-01-01', '%b', 'sq_AL'), 'Jan', 'Jan')
    assert(tz('2000-02-01', '%b', 'sq_AL'), 'Shk', 'Feb')
    assert(tz('2000-03-01', '%b', 'sq_AL'), 'Mar', 'Mar')
    assert(tz('2000-04-01', '%b', 'sq_AL'), 'Pri', 'Apr')
    assert(tz('2000-05-01', '%b', 'sq_AL'), 'Maj', 'May')
    assert(tz('2000-06-01', '%b', 'sq_AL'), 'Qer', 'Jun')
    assert(tz('2000-07-01', '%b', 'sq_AL'), 'Kor', 'Jul')
    assert(tz('2000-08-01', '%b', 'sq_AL'), 'Gsh', 'Aug')
    assert(tz('2000-09-01', '%b', 'sq_AL'), 'Sht', 'Sep')
    assert(tz('2000-10-01', '%b', 'sq_AL'), 'Tet', 'Oct')
    assert(tz('2000-11-01', '%b', 'sq_AL'), 'Nën', 'Nov')
    assert(tz('2000-12-01', '%b', 'sq_AL'), 'Dhj', 'Dec')

    // ' + name + ' months
    assert(tz('2000-01-01', '%B', 'sq_AL'), 'janar', 'January')
    assert(tz('2000-02-01', '%B', 'sq_AL'), 'shkurt', 'February')
    assert(tz('2000-03-01', '%B', 'sq_AL'), 'mars', 'March')
    assert(tz('2000-04-01', '%B', 'sq_AL'), 'prill', 'April')
    assert(tz('2000-05-01', '%B', 'sq_AL'), 'maj', 'May')
    assert(tz('2000-06-01', '%B', 'sq_AL'), 'qershor', 'June')
    assert(tz('2000-07-01', '%B', 'sq_AL'), 'korrik', 'July')
    assert(tz('2000-08-01', '%B', 'sq_AL'), 'gusht', 'August')
    assert(tz('2000-09-01', '%B', 'sq_AL'), 'shtator', 'September')
    assert(tz('2000-10-01', '%B', 'sq_AL'), 'tetor', 'October')
    assert(tz('2000-11-01', '%B', 'sq_AL'), 'nëntor', 'November')
    assert(tz('2000-12-01', '%B', 'sq_AL'), 'dhjetor', 'December')
})
