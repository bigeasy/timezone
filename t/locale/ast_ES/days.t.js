require('proof')(14, function (assert) {
    var tz = require('timezone')(require('timezone/ast_ES'))

    // ast_ES abbreviated days of week
    assert(tz('2006-01-01', '%a', 'ast_ES'), 'dom', 'Sun')
    assert(tz('2006-01-02', '%a', 'ast_ES'), 'llu', 'Mon')
    assert(tz('2006-01-03', '%a', 'ast_ES'), 'mar', 'Tue')
    assert(tz('2006-01-04', '%a', 'ast_ES'), 'mié', 'Wed')
    assert(tz('2006-01-05', '%a', 'ast_ES'), 'xue', 'Thu')
    assert(tz('2006-01-06', '%a', 'ast_ES'), 'vie', 'Fri')
    assert(tz('2006-01-07', '%a', 'ast_ES'), 'sáb', 'Sat')

    // ast_ES days of week
    assert(tz('2006-01-01', '%A', 'ast_ES'), 'domingu', 'Sunday')
    assert(tz('2006-01-02', '%A', 'ast_ES'), 'llunes', 'Monday')
    assert(tz('2006-01-03', '%A', 'ast_ES'), 'martes', 'Tuesday')
    assert(tz('2006-01-04', '%A', 'ast_ES'), 'miércoles', 'Wednesday')
    assert(tz('2006-01-05', '%A', 'ast_ES'), 'xueves', 'Thursday')
    assert(tz('2006-01-06', '%A', 'ast_ES'), 'vienres', 'Friday')
    assert(tz('2006-01-07', '%A', 'ast_ES'), 'sábadu', 'Saturday')
})
