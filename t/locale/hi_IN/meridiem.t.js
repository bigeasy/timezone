#!/usr/bin/env node
require("proof")(4, function (equal) {
  var tz = require("timezone")(require("timezone/hi_IN"));
  // hi_IN meridiem upper case
  equal(tz("2000-09-03 08:05:04", "%P", "hi_IN"), "am", "ante meridiem lower case");
  equal(tz("2000-09-03 23:05:04", "%P", "hi_IN"), "pm", "post meridiem lower case");

  // hi_IN meridiem lower case
  equal(tz("2000-09-03 08:05:04", "%p", "hi_IN"), "AM", "ante meridiem upper case");
  equal(tz("2000-09-03 23:05:04", "%p", "hi_IN"), "PM", "post meridiem upper case");
});
