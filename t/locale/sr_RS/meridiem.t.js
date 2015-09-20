#!/usr/bin/env node
require("proof")(4, function (equal) {
  var tz = require("timezone")(require("timezone/sr_RS"));
  // sr_RS meridiem upper case
  equal(tz("2000-09-03 08:05:04", "%P", "sr_RS"), "am", "ante meridiem lower case");
  equal(tz("2000-09-03 23:05:04", "%P", "sr_RS"), "pm", "post meridiem lower case");

  // sr_RS meridiem lower case
  equal(tz("2000-09-03 08:05:04", "%p", "sr_RS"), "AM", "ante meridiem upper case");
  equal(tz("2000-09-03 23:05:04", "%p", "sr_RS"), "PM", "post meridiem upper case");
});
