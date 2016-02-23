require('proof')(24, function (assert) {
    var tz = require('timezone')(require('timezone/nds_DE'))

    // nds_DE abbreviated months
    assert(tz('2000-01-01', '%b', 'nds_DE'), 'Jan', 'Jan')
    assert(tz('2000-02-01', '%b', 'nds_DE'), 'Feb', 'Feb')
    assert(tz('2000-03-01', '%b', 'nds_DE'), 'Mär', 'Mar')
    assert(tz('2000-04-01', '%b', 'nds_DE'), 'Apr', 'Apr')
    assert(tz('2000-05-01', '%b', 'nds_DE'), 'Mai', 'May')
    assert(tz('2000-06-01', '%b', 'nds_DE'), 'Jun', 'Jun')
    assert(tz('2000-07-01', '%b', 'nds_DE'), 'Jul', 'Jul')
    assert(tz('2000-08-01', '%b', 'nds_DE'), 'Aug', 'Aug')
    assert(tz('2000-09-01', '%b', 'nds_DE'), 'Sep', 'Sep')
    assert(tz('2000-10-01', '%b', 'nds_DE'), 'Okt', 'Oct')
    assert(tz('2000-11-01', '%b', 'nds_DE'), 'Nov', 'Nov')
    assert(tz('2000-12-01', '%b', 'nds_DE'), 'Dez', 'Dec')

    // ' + name + ' months
    assert(tz('2000-01-01', '%B', 'nds_DE'), 'Jannuaar', 'January')
    assert(tz('2000-02-01', '%B', 'nds_DE'), 'Feberwaar', 'February')
    assert(tz('2000-03-01', '%B', 'nds_DE'), 'März', 'March')
    assert(tz('2000-04-01', '%B', 'nds_DE'), 'April', 'April')
    assert(tz('2000-05-01', '%B', 'nds_DE'), 'Mai', 'May')
    assert(tz('2000-06-01', '%B', 'nds_DE'), 'Juni', 'June')
    assert(tz('2000-07-01', '%B', 'nds_DE'), 'Juli', 'July')
    assert(tz('2000-08-01', '%B', 'nds_DE'), 'August', 'August')
    assert(tz('2000-09-01', '%B', 'nds_DE'), 'September', 'September')
    assert(tz('2000-10-01', '%B', 'nds_DE'), 'Oktober', 'October')
    assert(tz('2000-11-01', '%B', 'nds_DE'), 'November', 'November')
    assert(tz('2000-12-01', '%B', 'nds_DE'), 'Dezember', 'December')
})
