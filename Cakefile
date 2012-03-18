{Twinkie}       = require "./vendor/twinkie/lib/twinkie"

twinkie = new Twinkie
twinkie.ignore "lib/*", "bin/*"
twinkie.coffee  "src/lib", "lib"
twinkie.coffee  "src/bin", "bin"
twinkie.copy    "src/lib", "lib", /\.js$/
twinkie.tasks task, "compile", "gitignore"
