var fs = require('fs');
var geolib = require('geolib');
var path = require('path');
var sets = require('simplesets');
// Create a Timezone function that knows about all the world's time zones. Add a
// custom `strftime` format specifier `%+` that returns the time zone offset in
// milliseconds.
var tz = require('timezone')(require('timezone/zones'), function () {
  this["+"] = function () { return this.entry.offset + this.entry.save }
});

// The "shortcut" iterates the timezone polygons when they are read in, and
// determines the minimum/maximum longitude of each.  Because there are what
// we professionals refer to as "a shitload" of polygons, and because the
// naive method I use for determining which timezone contains a given point
// could in the worst case require calculations on the order of O(shitload),
// I take advantage of the fact that my particular dataset clusters very
// heavily by degrees longitude.
// TODO cache this with file and read from cached file.
var SHORTCUT_DEGREES_LATITUDE = 1;
var SHORTCUT_DEGREES_LONGITUDE = 1;
// Maybe you only care about one region of the earth.  Exclude "America" to
// discard timezones that start with "America/", such as "America/Los Angeles"
// and "America/Chicago", etc.
var EXCLUDE_REGIONS = [];

var timezoneNamesToPolygons = null;
var timezoneLongitudeShortcuts = null;
var timezoneLatitudeShortcuts = null;
var geoJsonTimezoneFilePath = path.join(__dirname, 'tz_world.json');
var constructedShortcutFilePath = path.join(__dirname, 'shortcuts.json');

var constructShortcuts = function () {
  // Construct once
  if ((timezoneNamesToPolygons === null) || (timezoneLongitudeShortcuts === null)) {
    // Try to read from cache first
    if (false) {
      // TODO read from cached shortcut file
    } else {
      var now = Date.now();
      var featureCollection = JSON.parse(fs.readFileSync(geoJsonTimezoneFilePath, 'utf-8'));
      timezoneNamesToPolygons = {};
      for (var featureIndex in featureCollection['features']) {
        var tzname = featureCollection['features'][featureIndex]['properties']['TZID'];
        var region = tzname.split('/')[0];
        if (EXCLUDE_REGIONS.indexOf(region) === -1) {
          if (featureCollection['features'][featureIndex]['geometry']['type'] === 'Polygon') {
            var polys = featureCollection['features'][featureIndex]['geometry']['coordinates'];
            if (polys.length > 0 && !(tzname in timezoneNamesToPolygons)) {
              timezoneNamesToPolygons[tzname] = [];
            }
            for (var polyIndex in polys) {
              // WPS84 coordinates are [long, lat], while many conventions are [lat, long]
              // Our data is in WPS84.  Convert to an explicit format which geolib likes.
              var poly = [];
              for (var pointIndex in polys[polyIndex]) {
                poly.push({'lat': polys[polyIndex][pointIndex][1], 'lng': polys[polyIndex][pointIndex][0]});
              }
              timezoneNamesToPolygons[tzname].push(poly);
            }
          } else {
            console.log('WARNING Non-polygon region "' + tzname + '", ignored');
          }
        }
      }
      timezoneLongitudeShortcuts = {};
      timezoneLatitudeShortcuts = {};
      for (var tzname in timezoneNamesToPolygons) {
        for (var polyIndex in timezoneNamesToPolygons[tzname]) {
          var poly = timezoneNamesToPolygons[tzname][polyIndex]
          var bounds = geolib.getBounds(poly);
          var minLng = Math.floor(bounds['minLng'] / SHORTCUT_DEGREES_LONGITUDE) * SHORTCUT_DEGREES_LONGITUDE;
          var maxLng = Math.floor(bounds['maxLng'] / SHORTCUT_DEGREES_LONGITUDE) * SHORTCUT_DEGREES_LONGITUDE;
          var minLat = Math.floor(bounds['minLat'] / SHORTCUT_DEGREES_LATITUDE) * SHORTCUT_DEGREES_LATITUDE;
          var maxLat = Math.floor(bounds['maxLat'] / SHORTCUT_DEGREES_LATITUDE) * SHORTCUT_DEGREES_LATITUDE;
          for (var degree = minLng; degree <= maxLng; degree += SHORTCUT_DEGREES_LONGITUDE) {
            if (!(degree in timezoneLongitudeShortcuts)) {
              timezoneLongitudeShortcuts[degree] = {};
            }
            if (!(tzname in timezoneLongitudeShortcuts[degree])) {
              timezoneLongitudeShortcuts[degree][tzname] = [];
            }
            timezoneLongitudeShortcuts[degree][tzname].push(polyIndex);
          }
          for (var degree = minLat; degree <= maxLat; degree += SHORTCUT_DEGREES_LATITUDE) {
            if (!(degree in timezoneLatitudeShortcuts)) {
              timezoneLatitudeShortcuts[degree] = {};
            }
            if (!(tzname in timezoneLatitudeShortcuts[degree])) {
              timezoneLatitudeShortcuts[degree][tzname] = [];
            }
            timezoneLatitudeShortcuts[degree][tzname].push(polyIndex);
          }
        }
      }
      // As we're painstakingly constructing the shortcut table, let's write
      // it to cache so that future generations will be saved the ten
      // seconds of agony, and more importantly, the huge memory consumption.
      var polyTranslationsForReduce = {};
      var reducedShortcutData = {
        'lat': {
          'degree': SHORTCUT_DEGREES_LATITUDE,
        },
        'lng': {
          'degree': SHORTCUT_DEGREES_LONGITUDE,
        },
        'polys': {},
      };
      var avgTzPerShortcut = 0;
      for (var lngDeg in timezoneLongitudeShortcuts) {
        for (var latDeg in timezoneLatitudeShortcuts) {
          var lngSet = new sets.Set(Object.keys(timezoneLongitudeShortcuts[lngDeg]));
          var latSet = new sets.Set(Object.keys(timezoneLatitudeShortcuts[latDeg]));
          var applicableTimezones = lngSet.intersection(latSet).array();
          if (applicableTimezones.length > 1) {
            // We need these polys
            for (var tzindex in applicableTimezones) {
              var tzname = applicableTimezones[tzindex];
              var latPolys = timezoneLatitudeShortcuts[latDeg][tzname];
              var lngPolys = timezoneLongitudeShortcuts[lngDeg][tzname];
              
            }
          }
          avgTzPerShortcut += applicableTimezones.length;
        }
      }
      avgTzPerShortcut /= (Object.keys(timezoneLongitudeShortcuts).length * Object.keys(timezoneLatitudeShortcuts).length);
      console.log(Date.now() - now + 'ms to construct shortcut table');
      console.log('Average timezones per ' + SHORTCUT_DEGREES_LATITUDE + '° lat x ' + SHORTCUT_DEGREES_LONGITUDE + '° lng: ' + avgTzPerShortcut);
      
    }
  }
};
// Incur this cost at module import.
constructShortcuts();

var tzNameAt = function (latitude, longitude) {
  var latTzOptions = timezoneLatitudeShortcuts[Math.floor(latitude / SHORTCUT_DEGREES_LATITUDE) * SHORTCUT_DEGREES_LATITUDE];
  var latSet = new sets.Set(Object.keys(latTzOptions));
  var lngTzOptions = timezoneLongitudeShortcuts[Math.floor(longitude / SHORTCUT_DEGREES_LONGITUDE) * SHORTCUT_DEGREES_LONGITUDE];
  var lngSet = new sets.Set(Object.keys(lngTzOptions));
  var possibleTimezones = lngSet.intersection(latSet).array();
  if (possibleTimezones.length) {
    if (possibleTimezones.length === 1) {
      return possibleTimezones[0];
    } else {
      for (var tzindex in possibleTimezones) {
        var tzname = possibleTimezones[tzindex];
        var polyIndices = new sets.Set(latTzOptions[tzname]).intersection(new sets.Set(lngTzOptions[tzname])).array();
        for (var polyIndexIndex in polyIndices) {
          var polyIndex = polyIndices[polyIndexIndex];
          var poly = timezoneNamesToPolygons[tzname][polyIndex];
          var found = geolib.isPointInside({'lat': latitude, 'lng': longitude}, poly);
          if (found) {
            return tzname;
          }
        }
      }
    }
  }
  return null;
};

// Accepts [date constructor arguments ...], tzname
var dateIn = function () {
  if (arguments.length === 0) {
    return null;
  } else {
    var vargs = [], tzname, date;
    vargs.push.apply(vargs, arguments);
    tzname = vargs.pop();
    vargs.length > 1 && vargs[1]++; // zero month to humane month.
    date = vargs.length ? vargs.length == 1 ? vargs[0] : vargs.slice(0, 7) : Date.now();
    return tz(date, tzname);
  }
};

// Accepts latitude, longitude, ... where ... are arguments applicable to a "new
// Date(...)" call.
//
// Like new Date() and unlike Date.UTC(), dateAt() treats a single integer value
// as milliseconds since the epoch.
var dateAt = function () {
  var tzname = tzNameAt(arguments[0], arguments[1]);
  if (tzname) {
    // Pass any date constructors through.
    return dateIn.apply(this, Array.prototype.slice.call(arguments, 2).concat([tzname]));
  }
  return null;
};

// This will return "number of milliseconds to add to UTC to get a date in
// this time".  I know that's not a terribly obvious format, but it does let
// you go:
//   UTC standard date + offset = local date.
// Which is a little bit useful for things like when some event expressed in
// UTC happens in local time for multiple timezones around the world.
// Personally I don't get much use out of it, YMMV.
// Why milliseconds?  Because it's the time denomination of choice for JS.
//
// Now accepts a wall clock time for the location and converts the wall clock
// time to the time zone offset for the location at the given wall clock time.
//
// Like new Date() and unlike Date.UTC(), tzOffsetAt() treats a single integer
// value as milliseconds since the epoch.
var tzOffsetAt = function () {
  var vargs = [], tzname, date;
  vargs.push.apply(vargs, arguments);
  tzname = tzNameAt(vargs.shift(), vargs.shift());
  if (tzname) {
    vargs.length > 1 && vargs[1]++; // zero month to humane month.
    date = vargs.length ? vargs.length == 1 ? vargs[0] : vargs.slice(0, 7) : Date.now();
    return + tz(date, '%+', tzname);
  }
  return null;
};

// Allows you to call
// tzwhere.tzoffset(lat, long, function (error, offset) {
//   console.log(error ? error : offset);
// });
// with error handling and callback syntax, as well as
// console.log(tzwhere.tzoffset(lat, long));
// without error handling.
var wrap = function (f) {
  return function () {
    var error = null;
    var result = null;

    var callback = (typeof(arguments[arguments.length - 1]) == 'function') ? arguments[arguments.length - 1] : null;
    try {
      result = f.apply(this, callback ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : arguments);
    } catch (e) {
      error = e;
    }

    if (callback) {
      callback(error, result);
    } else if (error) {
      throw error;
    } else {
      return result;
    };
  };
}

module.exports = {
  'tzNameAt': wrap(tzNameAt),
  'dateAt': wrap(dateAt),
  'dateIn': wrap(dateIn),
  'tzOffsetAt': wrap(tzOffsetAt),
};