// The rest of GNU date. Maybe out to be broken up into localize and days.
!function (definition) {
  if (typeof module == "object" && module.exports) module.exports = definition();
  else if (typeof define == "function" && typeof define.amd == "object") define(definition)
  else this.tz = this.tz(definition());
} (function () {
  function weekOfYear (date, startOfWeek) {
    var diff, nyd, weekStart;
    nyd = new Date(Date.UTC(date.getUTCFullYear(), 0));
    diff = Math.floor((date.getTime() - nyd.getTime()) / 864e5);
    if (nyd.getUTCDay() == startOfWeek) {
      weekStart = 0;
    } else {
      weekStart = 7 - nyd.getUTCDay() + startOfWeek;
      if (weekStart == 8) {
        weekStart = 1;
      }
    }
    return diff >= weekStart ? Math.floor((diff - weekStart) / 7) + 1 : 0;
  }

  function isoWeek (date) {
    var nyd, nyy, week;
    nyy = date.getUTCFullYear();
    nyd = new Date(Date.UTC(nyy, 0)).getUTCDay();
    week = weekOfYear(date, 1) + (nyd > 1 && nyd <= 4 ? 1 : 0);
    if (week == 0) {
      nyy = date.getUTCFullYear() - 1;
      nyd = new Date(Date.UTC(nyy, 0)).getUTCDay();
      week = nyd == 4 || (nyd == 3 && new Date(nyy, 1, 29).getDate() == 29) ? 53 : 52;
      return [week, date.getUTCFullYear() - 1];
    } else if (week == 53 && !(nyd == 4 || (nyd == 3 && new Date(nyy, 1, 29).getDate() == 29))) {
      return [1, date.getUTCFullYear() + 1];
    } else {
      return [week, date.getUTCFullYear()];
    }
  }

  return function () {
    this.a = function (date) { return this[this.locale].day.abbrev[date.getUTCDay()] }
    this.A = function (date) { return this[this.locale].day.full[date.getUTCDay()] }
    this.j = function (date) { return Math.floor((date.getTime() - Date.UTC(date.getUTCFullYear(), 0)) / 864e5) + 1 }
    this.e = function (date) { return date.getUTCDate() }
    this.u = function (date) { return date.getUTCDay() == 0 ? 7 : date.getUTCDay() }
    this.w = function (date) { return date.getUTCDay() }
    this.U = function (date) { return weekOfYear(date, 0) }
    this.W = function (date) { return weekOfYear(date, 1) }
    this.V = function (date) { return isoWeek(date)[0] }
    this.G = function (date) { return isoWeek(date)[1] }
    this.g = function (date) { return isoWeek(date)[1] % 100 }
    this.h = function (date) { return this[this.locale].month.abbrev[date.getUTCMonth()] }
    this.b = function (date) { return this[this.locale].month.abbrev[date.getUTCMonth()] }
    this.B = function (date) { return this[this.locale].month.full[date.getUTCMonth()] }
    this.y = function (date) { return date.getUTCFullYear() % 100 }
    this.C = function (date) { return Math.floor(date.getUTCFullYear() / 100) }
    this.D = function (date, posix) { return this.convert([ posix, "%m/%d/%y" ]) }
    this.x = function (date, posix) { return this.convert([ posix, this[this.locale].dateFormat ]) }
    this.l = function (date) { return date.getUTCHours() % 12 == 0 ? 12 : date.getUTCHours() % 12 }
    this.I = function (date) { return date.getUTCHours() % 12 == 0 ? 12 : date.getUTCHours() % 12 }
    this.k = function (date) { return date.getUTCHours() }
    this.P = function (date) { return this[this.locale].meridiem[Math.floor(date.getUTCHours() / 12)].toLowerCase() }
    this.p = function (date) { return this[this.locale].meridiem[Math.floor(date.getUTCHours() / 12)] }
    this.r = function (date, posix) { return this.convert([ posix, "%I:%M:%S %p", "en_US" ]) }
    this.X = function (date, posix) { return this.convert([ posix, this[this.locale].timeFormat ]) }
    this.c = function (date, posix) { return this.convert([ posix, this[this.locale].dateTimeFormat ]) }

    this.U.pad = 2;
    this.W.pad = 2;
    this.V.pad = 2;
    this.g.pad = 2;
    this.j.pad = 3;
    this.C.pad = 2;
    this.I.pad = 2;
    this.k.pad = 2;
    this.y.pad = 2;

    this.k.style = "_";

    this.locale || (this.locale = "en_US")
    this.en_US = {
      day: {
        abbrev: "Sun Mon Tue Wed Thu Fri Sat".split(/\s/),
        full: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(/\s+/)
      },
      month: {
        abbrev: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(/\s+/),
        full: "January February March April May June July August September October November December".split(/\s+/)
      },
      dateFormat: "%m/%d/%Y",
      timeFormat: "%I:%M:%S %p",
      dateTimeFormat: "%a %d %b %Y %I:%M:%S %p %Z",
      meridiem: [ "AM", "PM" ]
    };
  }
});
