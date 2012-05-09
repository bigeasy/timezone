// RFC 822 is legacy data. As RFC 3999 likes to point out, it was open to
// interpretation, allowed a lot of leeway, and as such, supporting it is an
// archival project, codifying the man interpretations, possibly offering a lot
// of different switches to interpret the meaning of the timezone abbreviations.
//
// This is not a project I want to take on. I'm probably going to write a dirty
// rfc822, that trust only the numbers, the timezone offset if it is numeric,
// and any other timezone interpretation in up to the user.
//
// However, this is a no go right now. Not even going to open a ticket. Probably
// going to shuffle this off to a branch and delete it from the main branch.
/*
var __slice = [].slice;

function die () {
  console.log.apply(console, __slice.call(arguments, 0));
  return process.exit(1);
};

function say () { return console.log.apply(console, __slice.call(arguments, 0)) }
*/

function rfc822(pattern) {
    var day
      , date
      , match = /^\s*(\w{3}),\s+(\d{1,2})\s+(\w{3})\s+(\d{2,4})\s+(\d{2}):(\d{2})(?::(\d{2}))?\s*(?:([-+]?\d{4})|([A-IK-Z]|UT|GMT|[ECMP][SD]T))?\s*$/i.exec(pattern);
    if (!match) throw Error("invalid rfc822 date");

    match[1] = "sun|mon|tue|wed|thu|fri|sat".split("|").indexOf(match[1].toLowerCase());
    match[3] = "jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec".split("|").indexOf(match[3].toLowerCase());
    for (i = 1; i < 9; i++) {
      match[i] = parseInt(match[i] || "0", 10);
    }
    match[0] = match[4];
    match[4] = match[2];
    match[2] = match[0];
    
    day = match[1];
    offset = match[9] || match[8];
    match = match.slice(2, 8)

    date = new Date(Date.UTC.apply(Date.UTC, match));

    if (date.getUTCDay() != day) throw new Error("invalid rfc822 date");

    if (offset) match.push(offset < 0 ? "-" : "+", Math.abs(Math.floor(offset / 100)), offset % 100);
    else if (offset == "GMT") match.push("+", 0);

    return match;
}


rfc822("Fri, 08 May 92 21:38:46 -0400");
