var slice = [].slice

exports.readDate = function (date) {
    var match = /^(\d{4})(\d{2})(\d{2})$/.exec(date).slice(1), year = match[0], month = match[1], day = match[2]
    return new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10))).getTime()
}

var utc = exports.utc = function () {
    var splat = slice.call(arguments, 0)
    return Date.UTC.apply(Date.UTC, splat)
}
exports.bicentennial = utc(1976, 6, 4)
exports.moonwalk = utc(1969, 6, 21, 2, 56)
exports.y2k = utc(2000, 0, 1)

exports.tz = require('../build/timezone')
