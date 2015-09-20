#!/usr/bin/env node
require("proof")(24, function (equal) {
  var tz = require("timezone")(require("timezone/hi_IN"));
  //hi_IN abbreviated months
  equal(tz("2000-01-01", "%b", "hi_IN"), "Jan", "Jan");
  equal(tz("2000-02-01", "%b", "hi_IN"), "Feb", "Feb");
  equal(tz("2000-03-01", "%b", "hi_IN"), "Mar", "Mar");
  equal(tz("2000-04-01", "%b", "hi_IN"), "Apr", "Apr");
  equal(tz("2000-05-01", "%b", "hi_IN"), "May", "May");
  equal(tz("2000-06-01", "%b", "hi_IN"), "Jun", "Jun");
  equal(tz("2000-07-01", "%b", "hi_IN"), "Jul", "Jul");
  equal(tz("2000-08-01", "%b", "hi_IN"), "Aug", "Aug");
  equal(tz("2000-09-01", "%b", "hi_IN"), "Sep", "Sep");
  equal(tz("2000-10-01", "%b", "hi_IN"), "Oct", "Oct");
  equal(tz("2000-11-01", "%b", "hi_IN"), "Nov", "Nov");
  equal(tz("2000-12-01", "%b", "hi_IN"), "Dec", "Dec");

  // hi_IN months
  equal(tz("2000-01-01", "%B", "hi_IN"), "January", "January");
  equal(tz("2000-02-01", "%B", "hi_IN"), "February", "February");
  equal(tz("2000-03-01", "%B", "hi_IN"), "March", "March");
  equal(tz("2000-04-01", "%B", "hi_IN"), "April", "April");
  equal(tz("2000-05-01", "%B", "hi_IN"), "May", "May");
  equal(tz("2000-06-01", "%B", "hi_IN"), "June", "June");
  equal(tz("2000-07-01", "%B", "hi_IN"), "July", "July");
  equal(tz("2000-08-01", "%B", "hi_IN"), "August", "August");
  equal(tz("2000-09-01", "%B", "hi_IN"), "September", "September");
  equal(tz("2000-10-01", "%B", "hi_IN"), "October", "October");
  equal(tz("2000-11-01", "%B", "hi_IN"), "November", "November");
  equal(tz("2000-12-01", "%B", "hi_IN"), "December", "December");
});
