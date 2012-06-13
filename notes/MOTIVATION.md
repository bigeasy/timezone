# Why You Need a Timezone Aware JavaScript Date Library

 * THEME: JavaScript `Date` Does Not Work
 * SPO: http://www.english-for-students.com/Subject-Object-Predicate.html

If you've worked with dates in JavaScript, you've already run up against the
limitations of the JavaScript `Date` object. You probably already know that the
JavaScript `Date` object offers no way to parse dates, or format dates, nor does
it have any way to add or subtract time from dates.

You might not be aware of that `Date` has no concept of local time. Local time
is the time out there in the real world, the time on clock on the wall, offset
by a timezone, adjusted for daylight savings time. It is the time according to
the local government.

Local time is important if your program runs in more than one timezone. If your
program runs on the public web, then it runs in more than one timezone.

If your program runs in more than one timezone and you are entrusting your
timekeeping to the JavaScript `Date` then you are doing it wrong.

The JavaScript `Date` object has a useless dribble of support for local time.
The duplicate date field functions, some named `getXyz`, other named
`getUTCXyz`, might lead you to believe that it local time support is in effect,
but it is not.

The `getUTCXyz` methods of the `Date` object give you values of the different
date components in UTC, while the `getXyz` methods give you the UTC value offset
by some **arbitrary** number of minutes.  Yes, **arbitrary**, because the
timezone offset in JavaScript `Date` is the current timezone offset of the
client computer. The of your web application should be dictated by your web
application, not by the settings of an arbitrary client computer.

Local time is more than a single arbitrary offset. Local time is entirely
political. It is defined by borders and the whims of legislatures within those
borders. They adjust for daylight savings time. Consider the muddle that is
[time in Indiana](http://en.wikipedia.org/wiki/Time_in_Indiana), and you'll see
that a timezone is in no way scientific or standardized.

If your application works with dates in the past or the future, you need to know
when and if daylight savings time adjusts, if the local government has chosen to
apply daylight savings time at all. You need to know if the local government has
decided to move to a different timezone all together, and when this timezone
change took place.

That's why we use a timezone database to determine the local time, based on user
preferences stored in our web application.

### The Ways in Which Date Is Broken

There are some common patterns that use the JavaScript `Date` object to perform
basic date operations. They are fraught with peril.

Getting the number of minutes in a timestamp as an integer value is not terribly
useful to an application developer.

If you're formatting your dates by concatenating the `Date.getXyz` methods
string, you're making a mistake.

```javascript
// The quick and easy and wrong way to format a JavaScript date.
function brokenFormatDate (date) {
  return '' + (date.getMonth() +  1) + '/' +
               date.getDate() + '/' +
               date.getFullYear();
  }
}
```

When you create a `Date` object it will offset the field values by the timezone
offset of the computer at the time of the `Date` object's creation. You cannot
reset that offset.

Even if the `Date` value came from a server in your control, this offset is in
effect when you create the date. If you are providing dates as strings, you
might build a local date with the following date parser.

```javascript
function brokenParseDate (string) {
  var parts = /(\d{2})\/\d{2}\/\d{4}/.exec(string);
  for (var i = 1; i < 4; i++) {
    parts[i] = parseInt(parts[i], 10);
  }
  parts[1]++;
  return new Date(parts[3], parts[1], parts[2]);
}
```

### Time is Not Object-Oriented

When JavaScript was born, objects were all the rage. They were going to fix
everything, for everybody, forever.

When you model a date as an object, it is quite natural to see it as the
components of a digital clock face, each aspect of a dates display is an object
property. You adjust a date by adjusting its properties. You have a method to
get the minutes property. You have one to set the minutes property.

With your best comic book guy voice, read the following: A date, you see, is a
collection of attributes, including the number of minutes of the date, and the
day in year in which the day occurred. Using getters and setters we are able to
alter the date by adjusting its various properties. Also, there is a timezone
offset, but the end user should always have their system timzeon offset  set the
correct local time given the location of their computing device.  I, for one,
keep my computer set to Ketha standard time, the timezone of Ketha Provence on
Qo'noS, the Klingon home world.

We're rarely interested in a date as a bill of materials, an object with
component properties. The number of minutes in a date as an integer is not often
useful for application programming.

We're far more interested in dates as points in time, on a timeline, in relation
to other points on the same timeline.

POSIX time, with it's integer representation of a point is time, is a model of
time that reflects the way we think of time. Whereas the JavaScript `Date`
object is an exercise in object-orientation with a contrived result.

#### Regular Expressions Are Not Object Oriented

In large part, the utility of regular expressions comes from the language we use
to define them. It is easier to think of the pattern we want to match, if we
express it as a pattern.

```javascript
if (/$[0-9a-zA-Z]/.test("$a1")) {
  alert("Matched!");
}
```

Imagine if regular expressions had received the same treatment as dates. We'd be
assembling regular expressions through object composition, maybe through a
regular expression factory, where each step of the regular expression is
expressed as a function call.

```javascript
var regexBuilder = Regex.getFactory().newBuilder();
regexBuilder.addStartAnchor();
regexBuilder.addLiteralMatch("$");
var charClassBuilder = Regex.getFactory().newCharClassBuilder();
charClassBuilder.addRange("0", "9");
charClassBuilder.addRange("a", "z");
charClassBuilder.addRange("A", "Z");
var charClass = charClassBuilder.getInstance();
var closure = Regex.getFacetor().newKleeneClosure(charClass)
regexBuilder.addClosure(closure);
regexBuilder.endAnchor();
var regex = regexBuilder.newInstance();

if (regex.test("$a1")) {
  alert("Matched!");
}
```

Fortunately, JavaScript took a different path and chose to treat regular
expressions as expressions instead of objects.

Timezone choses to treat dates as points in time instead of objects. Timezone
choses to treat dates as expressions intead of objects.

#### Object Model Falling Down

When you display the date on a page, you don't display as an exploded diagram,
as if a date were a bill of materials.

Today's date is:

 * Year &mdash; 1969
 * Month &mdash; 5 (Zero Indexed)
 * Day &mdash; 21
 * Hour &mdash; 2
 * Minute &mdash; 36
 * Seconds &mdash; 0

You display it as a string.

Today's date is: 6/21/1969.

But, the object-oriented `Date` forces us to treat a date as a bill of materials
in our code, so that we're constantly typing out exploded diagrams of our dates.

This all too common date code is as ridiculous as a regular expression factory.

```javascript
var date = new Date();
var str = "";
str += date.getYear();
str += "/";
str += date.getMonth() + 1;
str += "/"
str += date.getDate();
str += " ";
if (date.getHours() < 10) {
  str += "0";
}
str += date.getHours();
if (date.getMinutes() < 10) {
  str += "0";
}
str += date.getMinutes();
if (date.getSeconds() < 10) {
  str += "0";
}
str += date.getSeconds();

alert("The current time is: " + str);
```

The Timezone way is much easier to express and understand.

```javascript
alert("The current time is: " + tz(tz.now, "%Y/%-m/%-d %H:%M:%S"));
```

By that token, which is easier to read, the following safer date constructor.

```javascript
var moonwalk = new Date(Date.UTC(1969, 5, 21, 2, 36));
```

Or a string?

```javascript
var moonwalk = tz("1969-05-21 02:36");
```

The major benefit of POSIX time over the `Date` object is that it is sortable.
You can order POSIX time quickly, since POSIX time is simply an integer value.

The benefit of Timezone over `Date` object is that is operates on a timeline. If
what you really want to do is get the number of minutes in a particular
timestamp as an integer, Timezone will do that. But, if what you'd rather do is
know the number of hours between a given timestamp and lunch the following
Friday, Timezone will do that too.

Hmm... Actually, do I want durations? Would that return object? Would it return
an array?

Timezone gives you a way of working with dates that is more natural, like the
regular expression built ins.

If you have sworn allegiance to design patterns, and favor the date as a bag of
integers model, because it is a model, try to think of Timezone as a domain
specific language, because those words are shinny and a very serious computer
paradigms. Timezone implements the interpreter pattern, so you can express dates
in

For the most parts, applications use dates a timestamps, search for events
within date ranges, or search for events before or after a certain date. We
format dates for display, which takes timezone and locale into account. We parse
date strings given by the user or by other systems.

The getters and setters are of dubious value:

```javascript
var moonwalk = new Date(Date.UTC(1969, 5, 21, 2, 36));
moonwalk.setUTCMinutes(moonwalk.getUTCMinutes() + 60);
alert(moonwalk.getUTCHours());
```

You have to carry those minutes yourself.

## Recording

What are you going to do? Display it? It would be nicer to have a date format
specifier to display the whole date, rather than concatenating a string with
extremely verbose object method invocations to get each part, plus the `pad`
method that needs to be rewritten every time.

What are you going to do? Increment it? If you want to move forward by minutes,
you could add the minutes and then set the value again, but if the new value is
greater than 60 then, you need to carry the minutes into the next hour.

To my mind, I could imagine building regular expressions in JavaScript using
object composition. Wouldn't that be a nightmare? Dates are so common that they
deserve their own language, like regular expressions. The Timezone library
replaces the `Date` object in applications with a domain specific language, so
that they feel more natural, like strings or regular expressions.

Dates feel unnatural because dates are represented as an object, as a box of
parts, a set of cubbyholes with getters and setters for each component.

Like regular expressions, we turn on switches, so modifiers... Good old printf.
We came back around to printf. As an example.

Make a slide show and present. Use your silly examples there. Show a regular
expression, then show it being built as an object using a factory pattern. Show
an example of someone who is a slave to fashion, 80's fashion or some silly
French fashion from the big crazy hair days.

You can get the integer value using a date format and the int modifier, which
will be null if you screw up, because the format is a programmer supplied value.


## Rationale

Elsewhere, I've gone into detail on why you should not use the JavaScript `Date`
object, and why it is not even worth it to monkey patch the `Date` object to add
the missing functionality. Read JavaScript The Good Parts, and then write like
that. Don't apologize too much. In fact, you know you're going to get people who
don't understand. Google is not going to be a good referral engine, but links
from other blogs will be.

Timezone was designed to provide all of the date functionality missing from
JavaScript in a single function, to keep from polluting the namespace.

Timezone models time as a point in time on a timeline. When you need to display
time, you use the `tz` function to format the date. When you need to move
relative to a point on the timeline, you use the `tz` function to do date math
according to the rules of a local timezone. If you don't want to apply local
timezone rules, then use UTC as the local timezone.  If you want to store time
as a time as local time, store it as a string, but it can be easily compared, if
you use the ISO 8601 format, but it will get confused when you hit daylight
savings time. Much better to store as POSIX time.

When you load timezone and locale data, it is global to the application. This is
because timezone and locale data is, literally, global data. There shouldn't be
a need for two different definitions of 'de_DE' within your application. There
had better not be two different definitions of 'America/New York' in your
application.

The API is really a domain specific language. The parameters can be passed in
any order because the different parameter types have an unambiguous meaning.

The `Date` object takes POSIX time and exposes the component values, which is
somewhat useful, but not not often what you need. You don't really don't often
need the number seconds in a timestamp as an integer value, you need to parse,
format, offset and compare dates. The POSIX time representation is perfect for
comparison. Formatting is easiest to express with a format pattern.

Even if it were timezone aware, the `Date` object is not a particularly useful
representation of

# Objectives

Development tasks:

 * Parse Olson file.
 * Create searchable structure for offsets and rules.
 * Create Olson file compiler utility.
 * Create tests with controls generated by a mature timezone library such as
   CPAN's DateTime::TimeZone or UNIX `date`.
 * Create a timezone conversion method.
 * Create a date offset method.
 * Create French and German locales to seed the locale set.

Decisions:

 * Olson files are compiled into JSON, loaded as JSON.
 * On the browser side, it is the job of the client to initialize the timezone
   data, to load it and whatnot.
 * In Node.js, timezone data is loaded *synchonously* as needed, or at startup.
 * Make a magic function that does format, parse and date math based on
   parameter order, to simplify import and minimize burden on namespace.

# Swipe

Applications are going to use dates the way people use dates in the real world.
They are not a collection of attributes, but a point on a timeline, interesting
only relative to other points on that timeline.

Objects were all the rage, it is a wonder that we didn't have a regular
expression factory pattern, and build regular expressions using getters and
setters, instead of parsing regular expression patterns. That is what the date
object is like.

Why didn't I monkey patch the `Date` object? Because its timezone support does
not work, the API for timezone support is awful.

Interesting support for [non Georgian calendars in
JavaScript](http://keith-wood.name/calendars.html). Too thurough breakdown of
[stuff in Joda Time](http://joda-time.sourceforge.net/userguide.html). Nice, but
too thurough.

NOTE: A timezone is not something you actually set. We don't keep a wallclock in
a software program. That is, we don't have a little gnome in our computer, who
checks the wallclock, and applies a timestamp based on what he sees. Setting the
timezone of a date is bananas. Timezone will let you create specialized
formatter that will format a date date string according to the timezone offset
rules for a specific timezone.
