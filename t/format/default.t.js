require('proof')(5, prove)

function prove (assert) {
    var tz = require('timezone'), util = require('../util')
    assert(tz(util.bicentennial, '%D'), '07/04/76', 'short date format')
    assert(tz(util.bicentennial, '%x'), '07/04/1976', 'long date format')
    assert(tz(util.moonwalk, '%r'), '02:56:00 AM', 'meridiem time format')
    assert(tz(util.moonwalk, '%R'), '02:56', 'military time format')
    assert(tz(util.moonwalk, '%T'), '02:56:00', 'military time format with seconds')
}
