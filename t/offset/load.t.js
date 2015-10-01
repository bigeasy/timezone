#!/usr/bin/env node

require('proof')(8, prove)

function prove (assert) {
    var tz = require('timezone')
    assert(tz('1945-08-14 18:59:00', 'America/Detroit', '%Z'), 'UTC', 'Detroit not loaded')
    assert(tz('1945-08-14 18:59:00', 'America/Detroit', '%Z', require('timezone/America/Detroit')), 'EWT', 'Detroit loaded immediately')

    var detroit = tz(require('timezone/America'))
    assert(detroit('1945-08-14 18:59:00', 'America/Detroit', '%Z'), 'EWT', 'Detroit loaded from America')
    assert(detroit('1916-01-03', 'Europe/Vilnius', '%Z'), 'UTC', 'Vilnius missing from America')

    var world = tz(require('timezone/zones'), 'America/Detroit')
    assert(world('1945-08-14 18:59:00', 'America/Detroit', '%Z'), 'EWT', 'Detroit loaded from World')
    assert(world('1916-01-03', 'Europe/Vilnius', '%Z'), 'WMT', 'Vilnius loaded from World')

    var loaded = require('timezone/loaded')
    assert(loaded('1945-08-14 18:59:00', 'America/Detroit', '%Z'), 'EWT', 'Detroit loaded from everyhing')
    assert(loaded('1916-01-03', 'Europe/Vilnius', '%Z'), 'WMT', 'Vilnius loaded from everyhing')
}
