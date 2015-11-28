require('proof')(2, prove)

function prove (assert) {
    assert(require('timezone/zones'), 'zones')
    assert(require('timezone/America'), 'America')
}
