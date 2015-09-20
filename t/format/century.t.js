#!/usr/bin/env node

require('proof')(1, prove)

function prove (assert) {
    var util = require('../util'), tz = require('timezone')
    assert(tz(util.bicentennial, '%C'), '19', 'century')
}
