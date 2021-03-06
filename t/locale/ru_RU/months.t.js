require('proof')(24, function (assert) {
    var tz = require('timezone')(require('timezone/ru_RU'))

    // ru_RU abbreviated months
    assert(tz('2000-01-01', '%b', 'ru_RU'), 'янв.', 'Jan')
    assert(tz('2000-02-01', '%b', 'ru_RU'), 'февр.', 'Feb')
    assert(tz('2000-03-01', '%b', 'ru_RU'), 'марта', 'Mar')
    assert(tz('2000-04-01', '%b', 'ru_RU'), 'апр.', 'Apr')
    assert(tz('2000-05-01', '%b', 'ru_RU'), 'мая', 'May')
    assert(tz('2000-06-01', '%b', 'ru_RU'), 'июня', 'Jun')
    assert(tz('2000-07-01', '%b', 'ru_RU'), 'июля', 'Jul')
    assert(tz('2000-08-01', '%b', 'ru_RU'), 'авг.', 'Aug')
    assert(tz('2000-09-01', '%b', 'ru_RU'), 'сент.', 'Sep')
    assert(tz('2000-10-01', '%b', 'ru_RU'), 'окт.', 'Oct')
    assert(tz('2000-11-01', '%b', 'ru_RU'), 'нояб.', 'Nov')
    assert(tz('2000-12-01', '%b', 'ru_RU'), 'дек.', 'Dec')

    // ' + name + ' months
    assert(tz('2000-01-01', '%B', 'ru_RU'), 'Январь', 'January')
    assert(tz('2000-02-01', '%B', 'ru_RU'), 'Февраль', 'February')
    assert(tz('2000-03-01', '%B', 'ru_RU'), 'Март', 'March')
    assert(tz('2000-04-01', '%B', 'ru_RU'), 'Апрель', 'April')
    assert(tz('2000-05-01', '%B', 'ru_RU'), 'Май', 'May')
    assert(tz('2000-06-01', '%B', 'ru_RU'), 'Июнь', 'June')
    assert(tz('2000-07-01', '%B', 'ru_RU'), 'Июль', 'July')
    assert(tz('2000-08-01', '%B', 'ru_RU'), 'Август', 'August')
    assert(tz('2000-09-01', '%B', 'ru_RU'), 'Сентябрь', 'September')
    assert(tz('2000-10-01', '%B', 'ru_RU'), 'Октябрь', 'October')
    assert(tz('2000-11-01', '%B', 'ru_RU'), 'Ноябрь', 'November')
    assert(tz('2000-12-01', '%B', 'ru_RU'), 'Декабрь', 'December')
})
