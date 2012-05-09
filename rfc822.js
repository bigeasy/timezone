    if (match = /^(.*?)(\w{3}),\s+(\d{1,2})\s+(\w{3})\s+(\d{2,4})\s+(\d{2}):(\d{2})(?::(\d{2}))?\s*(?:([A-IK-Z]|UT|GMT|[ECMP][SD]T)|([-+]?\d{4}))?(.*)$/i.exec(pattern)) {
      _ref = match.slice(1), before = _ref[0], dow = _ref[1], day = _ref[2], month = _ref[3], year = _ref[4], hours = _ref[5], minutes = _ref[6], seconds = _ref[7], zone = _ref[8], offset = _ref[9], after = _ref[10];
      dow = dow.toLowerCase();
      _ref1 = request.locales[request.locale].day.abbrev;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        abbrev = _ref1[_i];
        if (dow === abbrev.toLowerCase()) {
          dow = null;
          break;
        }
      }
      if (dow) {
        throw new Error("bad weekday");
      }
      month = month.toLowerCase();
      _ref2 = request.locales[request.locale].month.abbrev;
      for (i = _j = 0, _len1 = _ref2.length; _j < _len1; i = ++_j) {
        abbrev = _ref2[i];
        if (month === abbrev.toLowerCase()) {
          month = i;
          break;
        }
      }
      if (typeof month === "string") {
        throw new Error("bad month");
      }
      seconds || (seconds = "0");
      offset || (offset = "0");
      _ref3 = (function() {
        var _k, _len2, _ref3, _results;
        _ref3 = [day, year, hours, minutes, seconds, offset];
        _results = [];
        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
          num = _ref3[_k];
          _results.push(parseInt(num, 10));
        }
        return _results;
      })(), day = _ref3[0], year = _ref3[1], hours = _ref3[2], minutes = _ref3[3], seconds = _ref3[4], offset = _ref3[5];
      wallclock = makeDate(year, month + 1, day, hours, minutes, seconds, 0);
      if (offset) {
        posix = wallclock - Math.floor(offset / 100) * HOUR;
      } else {
        posix = convertToPOSIX(request, wallclock);
      }
      return posix;
    }
