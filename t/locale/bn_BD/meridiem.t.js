#!/usr/bin/env node
require("proof")(4, function (equal) {
  var tz = require("timezone")(require("timezone/bn_BD"));
  // bn_BD meridiem upper case
  equal(tz("2000-09-03 08:05:04", "%P", "bn_BD"), "am", "ante meridiem lower case");
  equal(tz("2000-09-03 23:05:04", "%P", "bn_BD"), "pm", "post meridiem lower case");

  // bn_BD meridiem lower case
  equal(tz("2000-09-03 08:05:04", "%p", "bn_BD"), "AM", "ante meridiem upper case");
  equal(tz("2000-09-03 23:05:04", "%p", "bn_BD"), "PM", "post meridiem upper case");
});
