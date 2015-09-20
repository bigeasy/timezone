#!/usr/bin/env node
require("proof")(4, function (equal) {
  var tz = require("timezone")(require("timezone/ur_PK"));
  // ur_PK meridiem upper case
  equal(tz("2000-09-03 08:05:04", "%P", "ur_PK"), "am", "ante meridiem lower case");
  equal(tz("2000-09-03 23:05:04", "%P", "ur_PK"), "pm", "post meridiem lower case");

  // ur_PK meridiem lower case
  equal(tz("2000-09-03 08:05:04", "%p", "ur_PK"), "AM", "ante meridiem upper case");
  equal(tz("2000-09-03 23:05:04", "%p", "ur_PK"), "PM", "post meridiem upper case");
});
