{Twinkie}       = require "./vendor/twinkie/lib/twinkie"

twinkie = new Twinkie
twinkie.ignore "zones", "timezones", "lib/timezone.js", "bin/tz2json.js", "bin/date2locale.js", "iana"
twinkie.coffee  "src/lib", "lib"
twinkie.coffee  "src/bin", "bin"
twinkie.copy    "src/lib", "lib", /\.js$/
twinkie.tasks task, "compile", "gitignore"
