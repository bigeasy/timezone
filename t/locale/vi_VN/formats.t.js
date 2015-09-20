#!/usr/bin/env node
require("proof")(5, function (equal) {
  var tz = require("timezone")(require("timezone/vi_VN"));
  // vi_VN date representation
  equal(tz("2000-09-03", "%x", "vi_VN"), "09/03/00", "date format");

  // vi_VN time representation
  equal(tz("2000-09-03 08:05:04", "%X", "vi_VN"), "08:05:04", "long time format morning");
  equal(tz("2000-09-03 23:05:04", "%X", "vi_VN"), "23:05:04", "long time format evening");

  // vi_VN date time representation
  equal(tz("2000-09-03 08:05:04", "%c", "vi_VN"), "Sun Sep  3 08:05:04 2000", "long date format morning");
  equal(tz("2000-09-03 23:05:04", "%c", "vi_VN"), "Sun Sep  3 23:05:04 2000", "long date format evening");
});
