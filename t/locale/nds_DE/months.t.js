#!/usr/bin/env node
require("proof")(24, function (equal) {
  var tz = require("timezone")(require("timezone/nds_DE"));
  //nds_DE abbreviated months
  equal(tz("2000-01-01", "%b", "nds_DE"), "Jan", "Jan");
  equal(tz("2000-02-01", "%b", "nds_DE"), "Feb", "Feb");
  equal(tz("2000-03-01", "%b", "nds_DE"), "Mar", "Mar");
  equal(tz("2000-04-01", "%b", "nds_DE"), "Apr", "Apr");
  equal(tz("2000-05-01", "%b", "nds_DE"), "May", "May");
  equal(tz("2000-06-01", "%b", "nds_DE"), "Jun", "Jun");
  equal(tz("2000-07-01", "%b", "nds_DE"), "Jul", "Jul");
  equal(tz("2000-08-01", "%b", "nds_DE"), "Aug", "Aug");
  equal(tz("2000-09-01", "%b", "nds_DE"), "Sep", "Sep");
  equal(tz("2000-10-01", "%b", "nds_DE"), "Oct", "Oct");
  equal(tz("2000-11-01", "%b", "nds_DE"), "Nov", "Nov");
  equal(tz("2000-12-01", "%b", "nds_DE"), "Dec", "Dec");

  // nds_DE months
  equal(tz("2000-01-01", "%B", "nds_DE"), "January", "January");
  equal(tz("2000-02-01", "%B", "nds_DE"), "February", "February");
  equal(tz("2000-03-01", "%B", "nds_DE"), "March", "March");
  equal(tz("2000-04-01", "%B", "nds_DE"), "April", "April");
  equal(tz("2000-05-01", "%B", "nds_DE"), "May", "May");
  equal(tz("2000-06-01", "%B", "nds_DE"), "June", "June");
  equal(tz("2000-07-01", "%B", "nds_DE"), "July", "July");
  equal(tz("2000-08-01", "%B", "nds_DE"), "August", "August");
  equal(tz("2000-09-01", "%B", "nds_DE"), "September", "September");
  equal(tz("2000-10-01", "%B", "nds_DE"), "October", "October");
  equal(tz("2000-11-01", "%B", "nds_DE"), "November", "November");
  equal(tz("2000-12-01", "%B", "nds_DE"), "December", "December");
});
