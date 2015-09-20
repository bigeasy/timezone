#!/usr/bin/env node

require('proof')(1, prove)

function prove (assert) {
    var util = require('../util'), tz = require('timezone')(require('timezone/America/Anchorage'))
    assert(tz(util.utc(1946, 0, 1, 10), '%Z', 'America/Anchorage'), 'CAT', 'standard')
}
