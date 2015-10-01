#!/usr/bin/env node

require('proof')(6, prove)

function prove (assert) {
    var tz = require('timezone')
    var detroit = tz(require('timezone/America/Detroit'), 'America/Detroit')
    assert(detroit('1975-04-27 02:59:00'), null, 'missing time')
    assert(tz(detroit('1975-04-27 01:59:00'), '%c'), 'Sun 27 Apr 1975 06:59:00 AM UTC', 'start late to UTC')
    assert(tz(detroit('1975-04-27 03:00:00'), '%c'), 'Sun 27 Apr 1975 07:00:00 AM UTC', 'start late to UTC')

    assert(detroit(tz('1975-04-27T07:00:00'), '-1 millisecond', '%z'), '-0500', 'before start late')
    assert(detroit(tz('1975-04-27T07:00:00'), '%z'), '-0400', 'start late')
    assert(detroit(tz('1975-04-27T07:00:00'), '+1 millisecond', '%z'), '-0400', 'after start late')
}
