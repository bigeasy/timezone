require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/ru_RU'))

    // ru_RU abbreviated days of week
    assert(tz('2006-01-01', '%a', 'ru_RU'), 'Вс.', 'Sun')
    assert(tz('2006-01-02', '%a', 'ru_RU'), 'Пн.', 'Mon')
    assert(tz('2006-01-03', '%a', 'ru_RU'), 'Вт.', 'Tue')
    assert(tz('2006-01-04', '%a', 'ru_RU'), 'Ср.', 'Wed')
    assert(tz('2006-01-05', '%a', 'ru_RU'), 'Чт.', 'Thu')
    assert(tz('2006-01-06', '%a', 'ru_RU'), 'Пт.', 'Fri')
    assert(tz('2006-01-07', '%a', 'ru_RU'), 'Сб.', 'Sat')

    // ru_RU days of week
    assert(tz('2006-01-01', '%A', 'ru_RU'), 'Воскресенье', 'Sunday')
    assert(tz('2006-01-02', '%A', 'ru_RU'), 'Понедельник', 'Monday')
    assert(tz('2006-01-03', '%A', 'ru_RU'), 'Вторник', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'ru_RU'), 'Среда', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'ru_RU'), 'Четверг', 'Thursday')
    assert(tz('2006-01-06', '%A', 'ru_RU'), 'Пятница', 'Friday')
    assert(tz('2006-01-07', '%A', 'ru_RU'), 'Суббота', 'Saturday')
})
