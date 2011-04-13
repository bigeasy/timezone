fs              = require("fs")
{exec, spawn}   = require("child_process")
path            = require("path")

# Get the current git branch.
currentBranch = (callback) ->
  branches = ""
  git = spawn "git", [ "branch" ], { customFds: [ 0, -1, 2 ] }
  git.stdout.on "data", (buffer) -> branches += buffer.toString()
  git.on "exit", (status) ->
    process.exit 1 if status != 0
    branch = /\*\s+(.*)/.exec(branches)[1]
    callback branch

# Cheap `make`. Why not use real `make`? Because real make solves a more
# complicated problem, building an artifact that has multiple dependencies,
# which in turn have dependencies. Here we build artifacts that each have a
# single dependency; a JavaScript file build from a CoffeeScript file.
coffeeSearch = (from, to, commands) ->
  # Gather up the CoffeeScript files and directories in the source directory.
  files = []
  dirs = []
  for file in fs.readdirSync from
    if match = /^(.*).coffee$/.exec(file)
      file = match[1]
      source = "#{from}/#{file}.coffee"
      try
        if fs.statSync(source).mtime > fs.statSync("#{to}/#{file}.js").mtime
          files.push source
      catch e
        files.push source
    else
      try
        stat = fs.statSync "#{from}/#{file}"
        if stat.isDirectory()
          dirs.push file
      catch e
        console.log "Gee Wilikers."

  # Create the destination directory if it does not exist.
  if files.length
    try
      fs.statSync to
    catch e
      fs.mkdirSync to, parseInt(755, 8)
    commands.push [ "coffee", "-c -o #{to}".split(/\s/).concat(files) ]

  for dir in dirs
    coffeeSearch "#{from}/#{dir}",  "#{to}/#{dir}", commands

task "gitignore", "create a .gitignore for node-ec2 based on git branch", ->
  currentBranch (branch) ->
    gitignore = '''
                .gitignore
                lib-cov
                .DS_Store
                **/.DS_Store
                
                '''

    if branch is "gh-pages"
      gitignore += '''
                   lib/packet.js
                   lib/pattern.js
                   '''
    else if branch is "master"
      gitignore += '''
                   documentation
                   site
                   index.html
                   lib/packet.js
                   lib/pattern.js
                   '''
    fs.writeFile(".gitignore", gitignore)

# Generate Node IDL documentation.
task "index", "rebuild the Node IDL landing page.", ->
  idl       = require("idl")
  package   = JSON.parse fs.readFileSync "package.json", "utf8"
  idl.generate "#{package.name}.idl", "index.html"

# Generate Docco documentation.
task "docco", "rebuild the CoffeeScript docco documentation.", ->
  exec "rm -rf documentation && docco src/*.coffee && cp -rf docs documentation && rm -r docs", (err) ->
    throw err if err

# Compile CoffeeScript sources.
task "compile", "compile the CoffeeScript into JavaScript", ->
  commands = []
  coffeeSearch "src/lib", "lib", commands
  index = 0
  next = ->
    if commands.length is 0
      callback() if callback?
    else
      command = commands.shift()
      command.push { customFds: [ 0, 1, 2 ] }
      less = spawn.apply null, command
      less.on "exit", (code) ->
        process.exit(code) unless code is 0
        next()
  next()

# Run Expresso test coverage.
task "coverage", "run coverage", ->
  expresso = spawn "expresso", [ "coverage.js", "--coverage" ], { customFds: [ 0, 1, 2 ] }
  expresso.on "exit", (status) -> process.exit(1) if status != 0

# Run tests.
task "test", "run tests", ->
  env = {}
  for key, value of process.env
    env[key] = value
  env.NODE_PATH = "./lib"
  exec "vows vows/*.js  --spec", { env }, (error, stdout, stderr) ->
    throw error if error
    process.stdout.write(stdout)
    process.stdout.write(stderr)

# Clean output files.
task "clean", "rebuild the CoffeeScript docco documentation.", ->
  currentBranch (branch) ->
    if branch is "master"
      rm = spawn "/bin/rm", "-rf site documentation lib/packet.js lib/pattern.js".split(/\s+/), { customFds: [ 0, 1, 2 ] }
      rm.on "exit", (code) ->
        process.exit code if code
