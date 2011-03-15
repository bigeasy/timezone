var vows = require('vows'),
    assert = require('assert'),
    format = require('timezone').format;

vows.describe('format').addBatch({
  'We can format': {
    topic: {
      bicentenial: new Date(Date.UTC(1976, 6, 4))
    },
    'the weekday abbreviated': function (topic) {
      assert.equal(format(topic.bicentenial, "%a"), "Sun");
    },
    'the weekday abbreviated with percents front and back': function (topic) {
      assert.equal(format(topic.bicentenial, "%%a%"), "%Sun%");
      assert.equal(format(topic.bicentenial, "%%%a%%"), "%%Sun%%");
    },
    'the full weekday': function (topic) {
      assert.equal(format(topic.bicentenial, "%A"), "Sunday");
    },
  }
}).export(module);
