edify = require("edify")()
edify.language "coffeescript"
  lexer: "coffeescript"
  docco: "#"
  ignore: [ /^#!/, /^#\s+vim/ ]
edify.language "javascript"
  lexer: "javascript"
  docco: "//"
  ignore: [ /^#!/, /^#\s+vim/ ]
edify.language "c"
  lexer: "c"
  ignore: [ /^#!/, /^# vim/ ]
  docco:
    start:  /^\s*\s(.*)/
    end:    /^(.*)\*\//
    strip:  /^\s+\*/
edify.parse "javascript", "code/synopsis.js", "synopsis.js.html", /\.js$/
edify.parse "markdown", "code/README.md", "index.html"
edify.parse "markdown", "code/MOTIVATION.md", "motivation.html"
edify.stencil /\/.*.md$/, "stencil/markdown.stencil"
edify.stencil /\/.*.js$/, "stencil/docco.stencil"
edify.stencil /\/.*.coffee$/, "stencil/docco.stencil"
edify.tasks task
