#!/usr/bin/env node

require('proof')(5, prove)

function prove (assert) {
    var tz = require('timezone')
    var detroit = tz(require('timezone/America/Detroit'), 'America/Detroit')
    assert(tz(detroit('1904-12-31 23:59:59'), '%F %T'), '1905-01-01 05:32:10', 'to UTC beforeend of LMT')
    assert(tz(detroit('1905-01-01 00:00:00'), '%F %T'), '1905-01-01 06:00:00', 'to UTC at end of LMT')

    assert(detroit(tz('1905-01-01 05:32:11'), '-1 millisecond', '%Z'), 'LMT', 'from UTC before end of LMT')
    assert(detroit(tz('1905-01-01 05:32:11'), '%Z'), 'CST', 'from UTC at end of LMT')
    assert(detroit(tz('1905-01-01 05:32:11'), '+1 millisecond', '%Z'), 'CST', 'from UTC after end of LMT')
}
