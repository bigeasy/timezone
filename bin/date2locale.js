(function() {
  var bash, createPattern, name, output, spawn, stdout;

  spawn = require("child_process").spawn;

  name = process.argv[2] || "en_US";

  output = process.argv[3] || "locale";

  bash = spawn("bash");

  bash.stdin.write("locale=" + name + "\ndays=()\nfor i in {1..7}\ndo\n    days+=($(LANG=$locale.UTF-8 date -d '2006-01-0'$i +'%a'))\ndone\necho ${days[*]}\n\ndays=()\nfor i in {1..7}\ndo\n    days+=($(LANG=$locale.UTF-8 date -d '2006-01-0'$i +'%A'))\ndone\necho ${days[*]}\n\nmonths=()\nfor i in {1..12}\ndo\n    number=$(printf '%02d' $i)\n    months+=($(LANG=$locale.UTF-8 date -d '2000-'$number-'01' +'%b'))\ndone\necho ${months[*]}\n\nmonths=()\nfor i in {1..12}\ndo\n    number=$(printf '%02d' $i)\n    months+=($(LANG=$locale.UTF-8 date -d '2000-'$number-'01' +'%B'))\ndone\necho ${months[*]}\n\nLANG=$locale.UTF-8 date -d '2000-09-03 08:05:04' +'%p'\nLANG=$locale.UTF-8 date -d '2000-09-03 23:05:04' +'%p'\nLANG=$locale.UTF-8 date -d '2000-09-03 08:05:04' +'%P'\nLANG=$locale.UTF-8 date -d '2000-09-03 23:05:04' +'%P'\nLANG=$locale.UTF-8 date -d 2000-09-03 +'%x'\nLANG=$locale.UTF-8 date -d 2000-09-03 +'%x'\nLANG=$locale.UTF-8 date -d '2000-09-03 08:05:04' +'%X'\nLANG=$locale.UTF-8 date -d '2000-09-03 23:05:04' +'%X'\nLANG=$locale.UTF-8 date -d '2000-09-03 08:05:04'\nLANG=$locale.UTF-8 date -d '2000-09-03 23:05:04'");

  bash.stdin.end();

  stdout = [];

  bash.stdout.on("data", function(chunk) {
    return stdout.push(chunk.toString("utf8"));
  });

  bash.on("exit", function(code) {
    var AM, PM, am, dateFormat, days, eveningDateTimeFormat, eveningTimeFormat, line, locale, months, morningDateTimeFormat, morningTimeFormat, pm, shortDays, shortMonths, _i, _len, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
    if (code) {
      console.log({
        code: code
      });
      return process.exit(1);
    } else {
      stdout = stdout.join("").split(/\n/);
      if (output === "locale") {
        for (_i = 0, _len = stdout.length; _i < _len; _i++) {
          line = stdout[_i];
          process.stdout.write("// " + line + "\n");
        }
        locale = {
          name: name,
          day: {},
          month: {},
          meridiem: [{}, {}]
        };
        locale.day.abbrev = stdout.shift().split(/\s+/);
        locale.day.full = stdout.shift().split(/\s+/);
        locale.month.abbrev = stdout.shift().split(/\s+/);
        locale.month.full = stdout.shift().split(/\s+/);
        _ref = stdout.splice(0, 2), am = _ref[0], pm = _ref[1];
        if (am && pm) {
          locale.meridiem[0].upper = am;
          locale.meridiem[1].upper = pm;
        }
        _ref2 = stdout.splice(0, 2), am = _ref2[0], pm = _ref2[1];
        if (am && pm) {
          locale.meridiem[0].lower = am;
          locale.meridiem[1].lower = pm;
        }
        _ref3 = stdout.splice(0, 2), am = _ref3[0], pm = _ref3[1];
        locale.dateFormat = createPattern(locale, am, pm);
        _ref4 = stdout.splice(0, 2), am = _ref4[0], pm = _ref4[1];
        locale.timeFormat = createPattern(locale, am, pm);
        _ref5 = stdout.splice(0, 2), am = _ref5[0], pm = _ref5[1];
        locale.dateTimeFormat = createPattern(locale, am, pm);
        process.stdout.write("module.exports = ");
        process.stdout.write(JSON.stringify(locale, null, 2));
        return process.stdout.write(";\n");
      } else {
        shortDays = stdout.shift().split(/\s+/);
        days = stdout.shift().split(/\s+/);
        shortMonths = stdout.shift().split(/\s+/);
        months = stdout.shift().split(/\s+/);
        _ref6 = stdout.splice(0, 4), am = _ref6[0], AM = _ref6[1], pm = _ref6[2], PM = _ref6[3];
        dateFormat = stdout.splice(0, 2)[0];
        _ref7 = stdout.splice(0, 2), morningTimeFormat = _ref7[0], eveningTimeFormat = _ref7[1];
        _ref8 = stdout.splice(0, 2), morningDateTimeFormat = _ref8[0], eveningDateTimeFormat = _ref8[1];
        return process.stdout.write("class TestLocale extends TwerpTest\n  \"test: " + name + " abbreviated days of week\": (done) ->\n    @equal tz(\"2006-01-01\", \"%a\", \"" + name + "\"), \"" + shortDays[0] + "\"\n    @equal tz(\"2006-01-02\", \"%a\", \"" + name + "\"), \"" + shortDays[1] + "\"\n    @equal tz(\"2006-01-03\", \"%a\", \"" + name + "\"), \"" + shortDays[2] + "\"\n    @equal tz(\"2006-01-04\", \"%a\", \"" + name + "\"), \"" + shortDays[3] + "\"\n    @equal tz(\"2006-01-05\", \"%a\", \"" + name + "\"), \"" + shortDays[4] + "\"\n    @equal tz(\"2006-01-06\", \"%a\", \"" + name + "\"), \"" + shortDays[5] + "\"\n    @equal tz(\"2006-01-07\", \"%a\", \"" + name + "\"), \"" + shortDays[6] + "\"\n    done 7\n\n  \"test: " + name + " days of week\": (done) ->\n    @equal tz(\"2006-01-01\", \"%A\", \"" + name + "\"), \"" + days[0] + "\"\n    @equal tz(\"2006-01-02\", \"%A\", \"" + name + "\"), \"" + days[1] + "\"\n    @equal tz(\"2006-01-03\", \"%A\", \"" + name + "\"), \"" + days[2] + "\"\n    @equal tz(\"2006-01-04\", \"%A\", \"" + name + "\"), \"" + days[3] + "\"\n    @equal tz(\"2006-01-05\", \"%A\", \"" + name + "\"), \"" + days[4] + "\"\n    @equal tz(\"2006-01-06\", \"%A\", \"" + name + "\"), \"" + days[5] + "\"\n    @equal tz(\"2006-01-07\", \"%A\", \"" + name + "\"), \"" + days[6] + "\"\n    done 7\n\n  \"test: " + name + " abbreviated months\": (done) ->\n    @equal tz(\"2000-01-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[0] + "\"\n    @equal tz(\"2000-02-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[1] + "\"\n    @equal tz(\"2000-03-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[2] + "\"\n    @equal tz(\"2000-04-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[3] + "\"\n    @equal tz(\"2000-05-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[4] + "\"\n    @equal tz(\"2000-06-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[5] + "\"\n    @equal tz(\"2000-07-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[6] + "\"\n    @equal tz(\"2000-08-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[7] + "\"\n    @equal tz(\"2000-09-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[8] + "\"\n    @equal tz(\"2000-10-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[9] + "\"\n    @equal tz(\"2000-11-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[10] + "\"\n    @equal tz(\"2000-12-01\", \"%b\", \"" + name + "\"), \"" + shortMonths[11] + "\"\n    done 7\n\n  \"test: " + name + " months\": (done) ->\n    @equal tz(\"2000-01-01\", \"%B\", \"" + name + "\"), \"" + months[0] + "\"\n    @equal tz(\"2000-02-01\", \"%B\", \"" + name + "\"), \"" + months[1] + "\"\n    @equal tz(\"2000-03-01\", \"%B\", \"" + name + "\"), \"" + months[2] + "\"\n    @equal tz(\"2000-04-01\", \"%B\", \"" + name + "\"), \"" + months[3] + "\"\n    @equal tz(\"2000-05-01\", \"%B\", \"" + name + "\"), \"" + months[4] + "\"\n    @equal tz(\"2000-06-01\", \"%B\", \"" + name + "\"), \"" + months[5] + "\"\n    @equal tz(\"2000-07-01\", \"%B\", \"" + name + "\"), \"" + months[6] + "\"\n    @equal tz(\"2000-08-01\", \"%B\", \"" + name + "\"), \"" + months[7] + "\"\n    @equal tz(\"2000-09-01\", \"%B\", \"" + name + "\"), \"" + months[8] + "\"\n    @equal tz(\"2000-10-01\", \"%B\", \"" + name + "\"), \"" + months[9] + "\"\n    @equal tz(\"2000-11-01\", \"%B\", \"" + name + "\"), \"" + months[10] + "\"\n    @equal tz(\"2000-12-01\", \"%B\", \"" + name + "\"), \"" + months[11] + "\"\n    done 7\n\n  \"test: " + name + " date representation\": (done) ->\n    @equal tz(\"2000-09-03\", \"%x\", \"" + name + "\"), \"" + dateFormat + "\"\n    done 1\n\n  \"test: " + name + " time representation\": (done) ->\n    @equal tz(\"2000-09-03 08:05:04\", \"%X\", \"" + name + "\"), \"" + morningTimeFormat + "\"\n    @equal tz(\"2000-09-03 23:05:04\", \"%X\", \"" + name + "\"), \"" + eveningTimeFormat + "\"\n    done 2\n\n  \"test: " + name + " date time representation\": (done) ->\n    @equal tz(\"2000-09-03 08:05:04\", \"%c\", \"" + name + "\"), \"" + morningDateTimeFormat + "\"\n    @equal tz(\"2000-09-03 23:05:04\", \"%c\", \"" + name + "\"), \"" + eveningDateTimeFormat + "\"\n    done 2\n");
      }
    }
  });

  createPattern = function(locale, am, pm) {
    var clock;
    am = am.replace("04", "%S");
    am = am.replace("05", "%M");
    clock = /11/.test(pm) ? "i" : "k";
    am = am.replace("08", "%" + clock);
    am = am.replace("8", "%-" + clock);
    am = am.replace("03", "%d");
    am = am.replace("3", "%-d");
    am = am.replace("09", "%m");
    am = am.replace("9", "%-m");
    am = am.replace("2000", "%Y");
    am = am.replace("00", "%y");
    am = am.replace(locale.meridiem[0].upper, "%p");
    am = am.replace(locale.meridiem[0].lower, "%P");
    am = am.replace(locale.day.abbrev[0], "%a");
    am = am.replace(locale.day.full[0], "%A");
    am = am.replace(locale.month.abbrev[8], "%b");
    am = am.replace(locale.month.full[8], "%B");
    am = am.replace(/\s+/g, " ");
    return am;
  };

}).call(this);
