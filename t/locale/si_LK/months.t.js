#!/usr/bin/env node
require("proof")(24, function (equal) {
  var tz = require("timezone")(require("timezone/si_LK"));
  //si_LK abbreviated months
  equal(tz("2000-01-01", "%b", "si_LK"), "Jan", "Jan");
  equal(tz("2000-02-01", "%b", "si_LK"), "Feb", "Feb");
  equal(tz("2000-03-01", "%b", "si_LK"), "Mar", "Mar");
  equal(tz("2000-04-01", "%b", "si_LK"), "Apr", "Apr");
  equal(tz("2000-05-01", "%b", "si_LK"), "May", "May");
  equal(tz("2000-06-01", "%b", "si_LK"), "Jun", "Jun");
  equal(tz("2000-07-01", "%b", "si_LK"), "Jul", "Jul");
  equal(tz("2000-08-01", "%b", "si_LK"), "Aug", "Aug");
  equal(tz("2000-09-01", "%b", "si_LK"), "Sep", "Sep");
  equal(tz("2000-10-01", "%b", "si_LK"), "Oct", "Oct");
  equal(tz("2000-11-01", "%b", "si_LK"), "Nov", "Nov");
  equal(tz("2000-12-01", "%b", "si_LK"), "Dec", "Dec");

  // si_LK months
  equal(tz("2000-01-01", "%B", "si_LK"), "January", "January");
  equal(tz("2000-02-01", "%B", "si_LK"), "February", "February");
  equal(tz("2000-03-01", "%B", "si_LK"), "March", "March");
  equal(tz("2000-04-01", "%B", "si_LK"), "April", "April");
  equal(tz("2000-05-01", "%B", "si_LK"), "May", "May");
  equal(tz("2000-06-01", "%B", "si_LK"), "June", "June");
  equal(tz("2000-07-01", "%B", "si_LK"), "July", "July");
  equal(tz("2000-08-01", "%B", "si_LK"), "August", "August");
  equal(tz("2000-09-01", "%B", "si_LK"), "September", "September");
  equal(tz("2000-10-01", "%B", "si_LK"), "October", "October");
  equal(tz("2000-11-01", "%B", "si_LK"), "November", "November");
  equal(tz("2000-12-01", "%B", "si_LK"), "December", "December");
});
