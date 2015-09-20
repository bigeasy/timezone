#!/usr/bin/env node
require("proof")(24, function (equal) {
  var tz = require("timezone")(require("timezone/ur_PK"));
  //ur_PK abbreviated months
  equal(tz("2000-01-01", "%b", "ur_PK"), "Jan", "Jan");
  equal(tz("2000-02-01", "%b", "ur_PK"), "Feb", "Feb");
  equal(tz("2000-03-01", "%b", "ur_PK"), "Mar", "Mar");
  equal(tz("2000-04-01", "%b", "ur_PK"), "Apr", "Apr");
  equal(tz("2000-05-01", "%b", "ur_PK"), "May", "May");
  equal(tz("2000-06-01", "%b", "ur_PK"), "Jun", "Jun");
  equal(tz("2000-07-01", "%b", "ur_PK"), "Jul", "Jul");
  equal(tz("2000-08-01", "%b", "ur_PK"), "Aug", "Aug");
  equal(tz("2000-09-01", "%b", "ur_PK"), "Sep", "Sep");
  equal(tz("2000-10-01", "%b", "ur_PK"), "Oct", "Oct");
  equal(tz("2000-11-01", "%b", "ur_PK"), "Nov", "Nov");
  equal(tz("2000-12-01", "%b", "ur_PK"), "Dec", "Dec");

  // ur_PK months
  equal(tz("2000-01-01", "%B", "ur_PK"), "January", "January");
  equal(tz("2000-02-01", "%B", "ur_PK"), "February", "February");
  equal(tz("2000-03-01", "%B", "ur_PK"), "March", "March");
  equal(tz("2000-04-01", "%B", "ur_PK"), "April", "April");
  equal(tz("2000-05-01", "%B", "ur_PK"), "May", "May");
  equal(tz("2000-06-01", "%B", "ur_PK"), "June", "June");
  equal(tz("2000-07-01", "%B", "ur_PK"), "July", "July");
  equal(tz("2000-08-01", "%B", "ur_PK"), "August", "August");
  equal(tz("2000-09-01", "%B", "ur_PK"), "September", "September");
  equal(tz("2000-10-01", "%B", "ur_PK"), "October", "October");
  equal(tz("2000-11-01", "%B", "ur_PK"), "November", "November");
  equal(tz("2000-12-01", "%B", "ur_PK"), "December", "December");
});
