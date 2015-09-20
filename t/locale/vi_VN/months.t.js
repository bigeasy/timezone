#!/usr/bin/env node
require("proof")(24, function (equal) {
  var tz = require("timezone")(require("timezone/vi_VN"));
  //vi_VN abbreviated months
  equal(tz("2000-01-01", "%b", "vi_VN"), "Th01", "Jan");
  equal(tz("2000-02-01", "%b", "vi_VN"), "Th02", "Feb");
  equal(tz("2000-03-01", "%b", "vi_VN"), "Th03", "Mar");
  equal(tz("2000-04-01", "%b", "vi_VN"), "Th04", "Apr");
  equal(tz("2000-05-01", "%b", "vi_VN"), "Th05", "May");
  equal(tz("2000-06-01", "%b", "vi_VN"), "Th06", "Jun");
  equal(tz("2000-07-01", "%b", "vi_VN"), "Th07", "Jul");
  equal(tz("2000-08-01", "%b", "vi_VN"), "Th08", "Aug");
  equal(tz("2000-09-01", "%b", "vi_VN"), "Th09", "Sep");
  equal(tz("2000-10-01", "%b", "vi_VN"), "Th10", "Oct");
  equal(tz("2000-11-01", "%b", "vi_VN"), "Th11", "Nov");
  equal(tz("2000-12-01", "%b", "vi_VN"), "Th12", "Dec");

  // vi_VN months
  equal(tz("2000-01-01", "%B", "vi_VN"), "Tháng", "January");
  equal(tz("2000-02-01", "%B", "vi_VN"), "một", "February");
  equal(tz("2000-03-01", "%B", "vi_VN"), "Tháng", "March");
  equal(tz("2000-04-01", "%B", "vi_VN"), "hai", "April");
  equal(tz("2000-05-01", "%B", "vi_VN"), "Tháng", "May");
  equal(tz("2000-06-01", "%B", "vi_VN"), "ba", "June");
  equal(tz("2000-07-01", "%B", "vi_VN"), "Tháng", "July");
  equal(tz("2000-08-01", "%B", "vi_VN"), "tư", "August");
  equal(tz("2000-09-01", "%B", "vi_VN"), "Tháng", "September");
  equal(tz("2000-10-01", "%B", "vi_VN"), "năm", "October");
  equal(tz("2000-11-01", "%B", "vi_VN"), "Tháng", "November");
  equal(tz("2000-12-01", "%B", "vi_VN"), "sáu", "December");
});
