#!/usr/bin/env node

require('proof')(5, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    var detroit = tz(require('timezone/America/Detroit'), 'America/Detroit')
    assert(tz(detroit('1945-09-30 01:59:00'), '%F %T'), '1945-09-30 05:59:00', 'to UTC before peace time')
    assert(tz(detroit('1945-09-30 02:00:00'), '%F %T'), '1945-09-30 07:00:00', 'to UTC before peace time')

    assert(detroit(tz('1945-09-30 06:00:00'), '-1 millisecond', '%z'), '-0400', 'from UTC before start of cold war')
    assert(detroit(tz('1945-09-30 06:00:00'), '%z'), '-0500', 'from UTC at start of cold war')
    assert(detroit(tz('1945-09-30 06:00:00'), '+1 millisecond', '%z'), '-0500', 'from UTC after start of cold war')
}
