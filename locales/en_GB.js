// Sun Mon Tue Wed Thu Fri Sat
// Sunday Monday Tuesday Wednesday Thursday Friday Saturday
// Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
// January February March April May June July August September October November December
// AM
// PM
// am
// pm
// 03/09/00
// 03/09/00
// 08:05:04
// 23:05:04
// Sun 03 Sep 2000 08:05:04 UTC
// Sun 03 Sep 2000 23:05:04 UTC
// 
module.exports = {
  "name": "en_GB",
  "day": {
    "abbrev": [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ],
    "full": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  "month": {
    "abbrev": [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    "full": [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  },
  "meridiem": [
    {
      "upper": "AM",
      "lower": "am"
    },
    {
      "upper": "PM",
      "lower": "pm"
    }
  ],
  "date": "%d/%m/%y",
  "time24": "%H:%M:%S",
  "dateTime": "%a %d %b %Y %H:%M:%S %Z"
};
