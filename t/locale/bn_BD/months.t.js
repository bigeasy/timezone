#!/usr/bin/env node
require("proof")(24, function (equal) {
  var tz = require("timezone")(require("timezone/bn_BD"));
  //bn_BD abbreviated months
  equal(tz("2000-01-01", "%b", "bn_BD"), "Jan", "Jan");
  equal(tz("2000-02-01", "%b", "bn_BD"), "Feb", "Feb");
  equal(tz("2000-03-01", "%b", "bn_BD"), "Mar", "Mar");
  equal(tz("2000-04-01", "%b", "bn_BD"), "Apr", "Apr");
  equal(tz("2000-05-01", "%b", "bn_BD"), "May", "May");
  equal(tz("2000-06-01", "%b", "bn_BD"), "Jun", "Jun");
  equal(tz("2000-07-01", "%b", "bn_BD"), "Jul", "Jul");
  equal(tz("2000-08-01", "%b", "bn_BD"), "Aug", "Aug");
  equal(tz("2000-09-01", "%b", "bn_BD"), "Sep", "Sep");
  equal(tz("2000-10-01", "%b", "bn_BD"), "Oct", "Oct");
  equal(tz("2000-11-01", "%b", "bn_BD"), "Nov", "Nov");
  equal(tz("2000-12-01", "%b", "bn_BD"), "Dec", "Dec");

  // bn_BD months
  equal(tz("2000-01-01", "%B", "bn_BD"), "January", "January");
  equal(tz("2000-02-01", "%B", "bn_BD"), "February", "February");
  equal(tz("2000-03-01", "%B", "bn_BD"), "March", "March");
  equal(tz("2000-04-01", "%B", "bn_BD"), "April", "April");
  equal(tz("2000-05-01", "%B", "bn_BD"), "May", "May");
  equal(tz("2000-06-01", "%B", "bn_BD"), "June", "June");
  equal(tz("2000-07-01", "%B", "bn_BD"), "July", "July");
  equal(tz("2000-08-01", "%B", "bn_BD"), "August", "August");
  equal(tz("2000-09-01", "%B", "bn_BD"), "September", "September");
  equal(tz("2000-10-01", "%B", "bn_BD"), "October", "October");
  equal(tz("2000-11-01", "%B", "bn_BD"), "November", "November");
  equal(tz("2000-12-01", "%B", "bn_BD"), "December", "December");
});
