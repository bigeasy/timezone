require('proof')(5, function (assert) {
    var tz = require('timezone')(require('timezone/ast_ES'))

    // ast_ES date representation
    assert(tz('2000-09-03', '%x', 'ast_ES'), '03/09/00', 'date format')

    // ast_ES time representation
    assert(tz('2000-09-03 08:05:04', '%X', 'ast_ES'), '08:05:04', 'long time format morning')
    assert(tz('2000-09-03 23:05:04', '%X', 'ast_ES'), '23:05:04', 'long time format evening')

    // ast_ES date time representation
    assert(tz('2000-09-03 08:05:04', '%c', 'ast_ES'), 'dom 03 set 2000 08:05:04 UTC', 'long date format morning')
    assert(tz('2000-09-03 23:05:04', '%c', 'ast_ES'), 'dom 03 set 2000 23:05:04 UTC', 'long date format evening')
})
