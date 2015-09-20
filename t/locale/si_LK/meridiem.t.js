#!/usr/bin/env node
require("proof")(4, function (equal) {
  var tz = require("timezone")(require("timezone/si_LK"));
  // si_LK meridiem upper case
  equal(tz("2000-09-03 08:05:04", "%P", "si_LK"), "am", "ante meridiem lower case");
  equal(tz("2000-09-03 23:05:04", "%P", "si_LK"), "pm", "post meridiem lower case");

  // si_LK meridiem lower case
  equal(tz("2000-09-03 08:05:04", "%p", "si_LK"), "AM", "ante meridiem upper case");
  equal(tz("2000-09-03 23:05:04", "%p", "si_LK"), "PM", "post meridiem upper case");
});
