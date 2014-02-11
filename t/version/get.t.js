#!/usr/bin/env node
require("../proof")(1, function (equal, tz) {
  equal(tz(), "0.0.25", "get");
});
