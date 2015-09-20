#!/usr/bin/env node
require("proof")(24, function (equal) {
  var tz = require("timezone")(require("timezone/vi_VN"));
  //vi_VN abbreviated months
  equal(tz("2000-01-01", "%b", "vi_VN"), "Jan", "Jan");
  equal(tz("2000-02-01", "%b", "vi_VN"), "Feb", "Feb");
  equal(tz("2000-03-01", "%b", "vi_VN"), "Mar", "Mar");
  equal(tz("2000-04-01", "%b", "vi_VN"), "Apr", "Apr");
  equal(tz("2000-05-01", "%b", "vi_VN"), "May", "May");
  equal(tz("2000-06-01", "%b", "vi_VN"), "Jun", "Jun");
  equal(tz("2000-07-01", "%b", "vi_VN"), "Jul", "Jul");
  equal(tz("2000-08-01", "%b", "vi_VN"), "Aug", "Aug");
  equal(tz("2000-09-01", "%b", "vi_VN"), "Sep", "Sep");
  equal(tz("2000-10-01", "%b", "vi_VN"), "Oct", "Oct");
  equal(tz("2000-11-01", "%b", "vi_VN"), "Nov", "Nov");
  equal(tz("2000-12-01", "%b", "vi_VN"), "Dec", "Dec");

  // vi_VN months
  equal(tz("2000-01-01", "%B", "vi_VN"), "January", "January");
  equal(tz("2000-02-01", "%B", "vi_VN"), "February", "February");
  equal(tz("2000-03-01", "%B", "vi_VN"), "March", "March");
  equal(tz("2000-04-01", "%B", "vi_VN"), "April", "April");
  equal(tz("2000-05-01", "%B", "vi_VN"), "May", "May");
  equal(tz("2000-06-01", "%B", "vi_VN"), "June", "June");
  equal(tz("2000-07-01", "%B", "vi_VN"), "July", "July");
  equal(tz("2000-08-01", "%B", "vi_VN"), "August", "August");
  equal(tz("2000-09-01", "%B", "vi_VN"), "September", "September");
  equal(tz("2000-10-01", "%B", "vi_VN"), "October", "October");
  equal(tz("2000-11-01", "%B", "vi_VN"), "November", "November");
  equal(tz("2000-12-01", "%B", "vi_VN"), "December", "December");
});
