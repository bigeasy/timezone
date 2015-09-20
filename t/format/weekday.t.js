#!/usr/bin/env node
require("proof")(2, function (equal, tz, bicentennial) {
    var tz = require('timezone'), util = require('../util')
  equal(tz(util.bicentennial, "%a"), "Sun", "weekday short");
  equal(tz(util.bicentennial, "%A"), "Sunday", "weekday long");
});
