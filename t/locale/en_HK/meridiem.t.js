#!/usr/bin/env node
require("proof")(4, function (equal) {
  var tz = require("timezone")(require("timezone/en_HK"));
  // en_HK meridiem upper case
  equal(tz("2000-09-03 08:05:04", "%P", "en_HK"), "am", "ante meridiem lower case");
  equal(tz("2000-09-03 23:05:04", "%P", "en_HK"), "pm", "post meridiem lower case");

  // en_HK meridiem lower case
  equal(tz("2000-09-03 08:05:04", "%p", "en_HK"), "AM", "ante meridiem upper case");
  equal(tz("2000-09-03 23:05:04", "%p", "en_HK"), "PM", "post meridiem upper case");
});
