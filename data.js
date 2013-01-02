#!/usr/bin/env node


var __slice = [].slice;

  function die () {
    console.log.apply(console, __slice.call(arguments, 0));
    return process.exit(1);
  };

  function say () { return console.log.apply(console, __slice.call(arguments, 0)) }

var path = require("path")
  , fs = require("fs")
  , tz = require("timezone")
  ;

function check (callback, forward) {
  return function (error, result) {
    if (error) callback(error);
    else forward(result);
  }
}

function mkdirp (path, index, callback) {
  var directory = path.slice(0, index + 1).join("/");

  fs.stat(directory, stat);

  function stat (error, stat) {
    if (error) {
      if (error.code == "ENOENT") fs.mkdir(directory, 0755, check(callback, next));
      else callback(error);
    } else {
      next();
    }
  }

  function next () {
    if (path.length == ++index) callback(null);
    else mkdirp(path, index, callback);
  }
}

function traverse (base, source, destination, visitor, callback) {
  fs.readdir(path.resolve(base, source), check(callback, readdir));

  function readdir (files) {
    var count = 0;
    files.forEach(function (file) {
      if (/^\./.test(file)) return ++count;

      var dest = path.resolve(base, destination, file)
        , src = path.resolve(base, source, file)

      fs.stat(src, check(callback, stat));

      function stat (stat) {
        if (stat.isDirectory()) {
          fs.stat(dest, mkdir);
        } else {
          visitor(src, dest, check(callback, visited));
        }
      }

      function mkdir (error, stat) {
        if (error) {
          if (error.code == "ENOENT") {
            mkdirp(dest.split("/"), 1, check(callback, descend));
          } else {
            callback(error);
          }
        } else {
          descend();
        }
      }

      function descend () {
        traverse(base, src, dest, visitor, check(callback, visited));
      }
    });

    function visited () {
      if (++count == files.length) callback(null);
    }
  }
}

function writeFormat (formatter, suffix) {
  return function (src, dest, callback) {
    var data = /\.js$/.test(src) && require(src), amd;
    if (Array.isArray(data) || (typeof data == "object" && (data.name || data.zones))) {
      if (path.basename(dest) == "index.js") {
        dest = dest.replace(/\/index\.js$/, suffix);
      } else {
        dest = dest.replace(/\.js$/, suffix);
      }
      fs.writeFile(dest, formatter(data), "utf8", callback);
    } else {
      callback(null);
    }
  }
}

function amd (data) {
  return "define(function () { return " + JSON.stringify(data) + " });"
}

function json (data) {
  return JSON.stringify(data, null, 2);
}

function jsonp (data) {
  return "timezoneJSONPCallback(" + JSON.stringify(data) + ");"
}

function formatify (dest, func, done) {
  mkdirp(path.resolve(process.cwd(), dest).split("/"), 1, check(done, function () {
    traverse(process.cwd(), "code/build/timezone", dest, func, done);
  }));
}

function datify () {
  var version = "v" + tz() + "/", count = 0;
  formatify(version + "amd", writeFormat(amd, ".js"), check(done, function () {
    formatify(version + "jsonp", writeFormat(jsonp, ".js"), check(done, function() {
      formatify(version + "json", writeFormat(json, ".json"), done);
    }));
  }));
  function done (error) {
    if (error) throw error;
    else console.log("DONE");
  }
}

datify();
