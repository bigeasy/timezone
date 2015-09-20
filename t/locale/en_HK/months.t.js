#!/usr/bin/env node
require("proof")(24, function (equal) {
  var tz = require("timezone")(require("timezone/en_HK"));
  //en_HK abbreviated months
  equal(tz("2000-01-01", "%b", "en_HK"), "Jan", "Jan");
  equal(tz("2000-02-01", "%b", "en_HK"), "Feb", "Feb");
  equal(tz("2000-03-01", "%b", "en_HK"), "Mar", "Mar");
  equal(tz("2000-04-01", "%b", "en_HK"), "Apr", "Apr");
  equal(tz("2000-05-01", "%b", "en_HK"), "May", "May");
  equal(tz("2000-06-01", "%b", "en_HK"), "Jun", "Jun");
  equal(tz("2000-07-01", "%b", "en_HK"), "Jul", "Jul");
  equal(tz("2000-08-01", "%b", "en_HK"), "Aug", "Aug");
  equal(tz("2000-09-01", "%b", "en_HK"), "Sep", "Sep");
  equal(tz("2000-10-01", "%b", "en_HK"), "Oct", "Oct");
  equal(tz("2000-11-01", "%b", "en_HK"), "Nov", "Nov");
  equal(tz("2000-12-01", "%b", "en_HK"), "Dec", "Dec");

  // en_HK months
  equal(tz("2000-01-01", "%B", "en_HK"), "January", "January");
  equal(tz("2000-02-01", "%B", "en_HK"), "February", "February");
  equal(tz("2000-03-01", "%B", "en_HK"), "March", "March");
  equal(tz("2000-04-01", "%B", "en_HK"), "April", "April");
  equal(tz("2000-05-01", "%B", "en_HK"), "May", "May");
  equal(tz("2000-06-01", "%B", "en_HK"), "June", "June");
  equal(tz("2000-07-01", "%B", "en_HK"), "July", "July");
  equal(tz("2000-08-01", "%B", "en_HK"), "August", "August");
  equal(tz("2000-09-01", "%B", "en_HK"), "September", "September");
  equal(tz("2000-10-01", "%B", "en_HK"), "October", "October");
  equal(tz("2000-11-01", "%B", "en_HK"), "November", "November");
  equal(tz("2000-12-01", "%B", "en_HK"), "December", "December");
});
