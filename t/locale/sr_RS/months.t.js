#!/usr/bin/env node
require("proof")(24, function (equal) {
  var tz = require("timezone")(require("timezone/sr_RS"));
  //sr_RS abbreviated months
  equal(tz("2000-01-01", "%b", "sr_RS"), "Jan", "Jan");
  equal(tz("2000-02-01", "%b", "sr_RS"), "Feb", "Feb");
  equal(tz("2000-03-01", "%b", "sr_RS"), "Mar", "Mar");
  equal(tz("2000-04-01", "%b", "sr_RS"), "Apr", "Apr");
  equal(tz("2000-05-01", "%b", "sr_RS"), "May", "May");
  equal(tz("2000-06-01", "%b", "sr_RS"), "Jun", "Jun");
  equal(tz("2000-07-01", "%b", "sr_RS"), "Jul", "Jul");
  equal(tz("2000-08-01", "%b", "sr_RS"), "Aug", "Aug");
  equal(tz("2000-09-01", "%b", "sr_RS"), "Sep", "Sep");
  equal(tz("2000-10-01", "%b", "sr_RS"), "Oct", "Oct");
  equal(tz("2000-11-01", "%b", "sr_RS"), "Nov", "Nov");
  equal(tz("2000-12-01", "%b", "sr_RS"), "Dec", "Dec");

  // sr_RS months
  equal(tz("2000-01-01", "%B", "sr_RS"), "January", "January");
  equal(tz("2000-02-01", "%B", "sr_RS"), "February", "February");
  equal(tz("2000-03-01", "%B", "sr_RS"), "March", "March");
  equal(tz("2000-04-01", "%B", "sr_RS"), "April", "April");
  equal(tz("2000-05-01", "%B", "sr_RS"), "May", "May");
  equal(tz("2000-06-01", "%B", "sr_RS"), "June", "June");
  equal(tz("2000-07-01", "%B", "sr_RS"), "July", "July");
  equal(tz("2000-08-01", "%B", "sr_RS"), "August", "August");
  equal(tz("2000-09-01", "%B", "sr_RS"), "September", "September");
  equal(tz("2000-10-01", "%B", "sr_RS"), "October", "October");
  equal(tz("2000-11-01", "%B", "sr_RS"), "November", "November");
  equal(tz("2000-12-01", "%B", "sr_RS"), "December", "December");
});
