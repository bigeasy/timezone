#!/usr/bin/env node

var path = require('path'), fs = require('fs')
var argv = process.argv.slice(2), file = argv[0], locale = path.basename(file)

function esc (string) {
    return string.replace(/'/g, '\\\'')
}

// To use with Ubuntu you must `sudo apt-get install 'language-pack-*'`.


// This bit runs off the UNIX locale definition files. http://man7.org/linux/man-pages/man5/locale.5.html
var lines = fs.readFileSync(file, 'utf8')
var time = lines.slice(lines.indexOf('\nLC_TIME'), lines.indexOf('END LC_TIME')).replace(/%[^\n\/"]+(\/?\n)/g, '$1').replace(/\/\n/g,'').split(/\n/)

var locale = {
    "name": locale,
    "day": {
        "abbrev": [ ],
        "full": [ ]
    },
    "month": { "abbrev": [], "full": [ ] },
    "meridiem": [],
    "date": "",
    "time24": "",
    "dateTime": ""
}

try {
    time.filter(function (line) { return ! /^\s*$|^\s*%/.test(line) }).forEach(function (line) {
        var $
        if ($ = /^([\w\d_]+)(.*)$/.exec(line)) {
            switch ($[1]) {
            case "abday":
                locale.day.abbrev = strings($[2])
                break
            case "day":
                locale.day.full = strings($[2])
                break
            case "abmon":
                locale.month.abbrev = strings($[2])
                break
            case "mon":
                locale.month.full = strings($[2])
                break
            case "d_t_fmt":
                locale.dateTime = strings($[2]).pop()
                break
            case "d_fmt":
                locale.date = strings($[2]).pop()
                break
            case "t_fmt":
                locale.time24 = strings($[2]).pop()
                break
            case "t_fmt_ampm":
                locale.time12 = strings($[2]).pop()
                break
            case "am_pm":
                locale.meridiem = strings($[2])
                break
            case "date_fmt":
                locale.full = strings($[2]).pop()
                break
            }
        }
    })
} catch (e) {
    throw e
}

process.stdout.write("module.exports = ")
process.stdout.write(JSON.stringify(locale, null, 2))
process.stdout.write("\n")

require('child_process').exec('util/rigamorale ' + locale.name, function (error, stdout) {
    stdout = stdout.split(/\n/)
    var shortDays = stdout.shift().split('|')
    var days = stdout.shift().split('|')
    var shortMonths = stdout.shift().split('|')
    var months = stdout.shift().split('|')
    shortDays.pop()
    shortDays.shift()
    days.pop()
    days.shift()
    shortMonths.pop()
    shortMonths.shift()
    months.pop()
    months.shift()
    var AM = stdout.shift()
    var PM = stdout.shift()
    var am = stdout.shift()
    var pm = stdout.shift()
    var dateFormat = stdout.splice(0, 2).shift()
    var morningTimeFormat = stdout.shift()
    var eveningTimeFormat = stdout.shift()
    var morningDateTimeFormat = stdout.shift()
    var eveningDateTimeFormat = stdout.shift()
    var name = locale.name
    fs.writeFileSync('t/locale/' + name + '/days.t.js', "\
require('proof')(14, function (assert) {\n\
    var tz = require('timezone')(require('timezone/" + name + "'))\n\
\n\
    // " + name + " abbreviated days of week\n\
    assert(tz('2006-01-01', '%a', '" + name + "'), '" + esc(shortDays[0]) + "', 'Sun')\n\
    assert(tz('2006-01-02', '%a', '" + name + "'), '" + esc(shortDays[1]) + "', 'Mon')\n\
    assert(tz('2006-01-03', '%a', '" + name + "'), '" + esc(shortDays[2]) + "', 'Tue')\n\
    assert(tz('2006-01-04', '%a', '" + name + "'), '" + esc(shortDays[3]) + "', 'Wed')\n\
    assert(tz('2006-01-05', '%a', '" + name + "'), '" + esc(shortDays[4]) + "', 'Thu')\n\
    assert(tz('2006-01-06', '%a', '" + name + "'), '" + esc(shortDays[5]) + "', 'Fri')\n\
    assert(tz('2006-01-07', '%a', '" + name + "'), '" + esc(shortDays[6]) + "', 'Sat')\n\
\n\
    // " + name + " days of week\n\
    assert(tz('2006-01-01', '%A', '" + name + "'), '" + esc(days[0]) + "', 'Sunday')\n\
    assert(tz('2006-01-02', '%A', '" + name + "'), '" + esc(days[1]) + "', 'Monday')\n\
    assert(tz('2006-01-03', '%A', '" + name + "'), '" + esc(days[2]) + "', 'Tuesday')\n\
    assert(tz('2006-01-04', '%A', '" + name + "'), '" + esc(days[3]) + "', 'Wednesday')\n\
    assert(tz('2006-01-05', '%A', '" + name + "'), '" + esc(days[4]) + "', 'Thursday')\n\
    assert(tz('2006-01-06', '%A', '" + name + "'), '" + esc(days[5]) + "', 'Friday')\n\
    assert(tz('2006-01-07', '%A', '" + name + "'), '" + esc(days[6]) + "', 'Saturday')\n\
})\n\
")
    fs.writeFileSync('t/locale/' + name + '/months.t.js', "\
require('proof')(24, function (assert) {\n\
    var tz = require('timezone')(require('timezone/" + name + "'))\n\
\n\
    // " + name + " abbreviated months\n\
    assert(tz('2000-01-01', '%b', '" + name + "'), '" + shortMonths[0] + "', 'Jan')\n\
    assert(tz('2000-02-01', '%b', '" + name + "'), '" + shortMonths[1] + "', 'Feb')\n\
    assert(tz('2000-03-01', '%b', '" + name + "'), '" + shortMonths[2] + "', 'Mar')\n\
    assert(tz('2000-04-01', '%b', '" + name + "'), '" + shortMonths[3] + "', 'Apr')\n\
    assert(tz('2000-05-01', '%b', '" + name + "'), '" + shortMonths[4] + "', 'May')\n\
    assert(tz('2000-06-01', '%b', '" + name + "'), '" + shortMonths[5] + "', 'Jun')\n\
    assert(tz('2000-07-01', '%b', '" + name + "'), '" + shortMonths[6] + "', 'Jul')\n\
    assert(tz('2000-08-01', '%b', '" + name + "'), '" + shortMonths[7] + "', 'Aug')\n\
    assert(tz('2000-09-01', '%b', '" + name + "'), '" + shortMonths[8] + "', 'Sep')\n\
    assert(tz('2000-10-01', '%b', '" + name + "'), '" + shortMonths[9] + "', 'Oct')\n\
    assert(tz('2000-11-01', '%b', '" + name + "'), '" + shortMonths[10] + "', 'Nov')\n\
    assert(tz('2000-12-01', '%b', '" + name + "'), '" + shortMonths[11] + "', 'Dec')\n\
\n\
    // ' + name + ' months\n\
    assert(tz('2000-01-01', '%B', '" + name + "'), '" + months[0] + "', 'January')\n\
    assert(tz('2000-02-01', '%B', '" + name + "'), '" + months[1] + "', 'February')\n\
    assert(tz('2000-03-01', '%B', '" + name + "'), '" + months[2] + "', 'March')\n\
    assert(tz('2000-04-01', '%B', '" + name + "'), '" + months[3] + "', 'April')\n\
    assert(tz('2000-05-01', '%B', '" + name + "'), '" + months[4] + "', 'May')\n\
    assert(tz('2000-06-01', '%B', '" + name + "'), '" + months[5] + "', 'June')\n\
    assert(tz('2000-07-01', '%B', '" + name + "'), '" + months[6] + "', 'July')\n\
    assert(tz('2000-08-01', '%B', '" + name + "'), '" + months[7] + "', 'August')\n\
    assert(tz('2000-09-01', '%B', '" + name + "'), '" + months[8] + "', 'September')\n\
    assert(tz('2000-10-01', '%B', '" + name + "'), '" + months[9] + "', 'October')\n\
    assert(tz('2000-11-01', '%B', '" + name + "'), '" + months[10] + "', 'November')\n\
    assert(tz('2000-12-01', '%B', '" + name + "'), '" + months[11] + "', 'December')\n\
})\n\
")

    fs.writeFileSync('t/locale/' + name + '/formats.t.js', "\
require('proof')(5, function (assert) {\n\
    var tz = require('timezone')(require('timezone/" + name + "'))\n\
\n\
    // " + name + " date representation\n\
    assert(tz('2000-09-03', '%x', '" + name + "'), '" + esc(dateFormat) + "', 'date format')\n\
\n\
    // " + name + " time representation\n\
    assert(tz('2000-09-03 08:05:04', '%X', '" + name + "'), '" + esc(morningTimeFormat) + "', 'long time format morning')\n\
    assert(tz('2000-09-03 23:05:04', '%X', '" + name + "'), '" + esc(eveningTimeFormat) + "', 'long time format evening')\n\
\n\
    // " + name + " date time representation\n\
    assert(tz('2000-09-03 08:05:04', '%c', '" + name + "'), '" + esc(morningDateTimeFormat) + "', 'long date format morning')\n\
    assert(tz('2000-09-03 23:05:04', '%c', '" + name + "'), '" + esc(eveningDateTimeFormat) + "', 'long date format evening')\n\
})\n\
")
    if (am || AM || pm || PM) {
        fs.writeFileSync('t/locale/' + name + '/meridiem.t.js', "\
require('proof')(4, function (assert) {\n\
    var tz = require('timezone')(require('timezone/" + name + "'))\n\
\n\
    // " + name + " meridiem upper case\n\
    assert(tz('2000-09-03 08:05:04', '%P', '" + name + "'), '" + am + "', 'ante meridiem lower case')\n\
    assert(tz('2000-09-03 23:05:04', '%P', '" + name + "'), '" + pm + "', 'post meridiem lower case')\n\
\n\
    // " + name + " meridiem lower case\n\
    assert(tz('2000-09-03 08:05:04', '%p', '" + name +  "'), '" + AM + "', 'ante meridiem upper case')\n\
    assert(tz('2000-09-03 23:05:04', '%p', '" + name + "'), '" + PM + "', 'post meridiem upper case')\n\
})\n\
")
    }
})


function strings (line) {
    return line.trim().split(/\s*;\s*/).map(function (string) {
        return JSON.parse(string.replace(/<U([\da-f]+)>/ig, '\\u$1'))
    })
}
