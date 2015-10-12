#!/usr/bin/env node

require('proof')(1, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(), '0.0.47', 'get')
}
