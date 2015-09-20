#!/usr/bin/env node

require('proof')(8, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.utc(2011, 0, 1, 0), '%P'), 'am', 'lower case AM midnight');
    assert(tz(util.utc(2011, 0, 1, 1), '%P'), 'am', 'lower case AM');
    assert(tz(util.utc(2011, 0, 1, 12), '%P'), 'pm', 'lower case PM noon');
    assert(tz(util.utc(2011, 0, 1, 13), '%P'), 'pm', 'lower case PM');
    assert(tz(util.utc(2011, 0, 1, 0), '%p'), 'AM', 'upper case AM midnight');
    assert(tz(util.utc(2011, 0, 1, 1), '%p'), 'AM', 'lower case AM');
    assert(tz(util.utc(2011, 0, 1, 12), '%p'), 'PM', 'upper case PM noon');
    assert(tz(util.utc(2011, 0, 1, 13), '%p'), 'PM', 'upper case PM');
}
