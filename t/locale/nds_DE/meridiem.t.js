#!/usr/bin/env node
require("proof")(4, function (equal) {
  var tz = require("timezone")(require("timezone/nds_DE"));
  // nds_DE meridiem upper case
  equal(tz("2000-09-03 08:05:04", "%P", "nds_DE"), "am", "ante meridiem lower case");
  equal(tz("2000-09-03 23:05:04", "%P", "nds_DE"), "pm", "post meridiem lower case");

  // nds_DE meridiem lower case
  equal(tz("2000-09-03 08:05:04", "%p", "nds_DE"), "AM", "ante meridiem upper case");
  equal(tz("2000-09-03 23:05:04", "%p", "nds_DE"), "PM", "post meridiem upper case");
});
