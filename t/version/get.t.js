#!/usr/bin/env node
require("proof")(1, function (equal, tz) {
    var tz = require('timezone'), util = require('../util')
  equal(tz(), "0.0.47", "get");
});
