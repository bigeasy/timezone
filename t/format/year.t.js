#!/usr/bin/env node
require("proof")(4, function (equal, tz, y2k, bicentennial) {
    var tz = require('timezone'), util = require('../util')
  equal(tz(util.y2k, "%Y"), "2000", "long year 2000");
  equal(tz(util.bicentennial, "%Y"), "1976", "long year 1976");
  equal(tz(util.y2k, "%y"), "00", "short year 2000");
  equal(tz(util.bicentennial, "%y"), "76", "short year 1976");
});
