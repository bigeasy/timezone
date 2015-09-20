#!/usr/bin/env node
require("proof")(4, function (equal) {
  var tz = require("timezone")(require("timezone/es_DO"));
  // es_DO meridiem upper case
  equal(tz("2000-09-03 08:05:04", "%P", "es_DO"), "a.m.", "ante meridiem lower case");
  equal(tz("2000-09-03 23:05:04", "%P", "es_DO"), "p.m.", "post meridiem lower case");

  // es_DO meridiem lower case
  equal(tz("2000-09-03 08:05:04", "%p", "es_DO"), "a.m.", "ante meridiem upper case");
  equal(tz("2000-09-03 23:05:04", "%p", "es_DO"), "p.m.", "post meridiem upper case");
});
