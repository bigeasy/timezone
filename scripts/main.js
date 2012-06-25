requirejs.config(
{ paths:
  { zones: "../v0.0.14/amd"
  , locales: "../v0.0.14/amd"
  }
});
require(["timezone"], function (tz) {
  require([ "zones/Europe", "locales/de_DE"], function(zone, locale) {
    alert(tz(Date.now(), "%c", "de_DE", "Europe/Berlin", zone, locale));
  });
});
