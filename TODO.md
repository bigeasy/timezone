Thoughts on this...

I now have an ugly syntax. So..


date = tz tz.now, "minute 0", "hour 0", "second 0"

date = tz tz.now, "00:00:00.0"
date = tz tz.now, "--:00:00.0"

# What is wrong with this? Nothing!
rfc822 = tz tz(tz.now, "%Y-%m"), "-1 day", "+1 sunday", tz.rfc822
rfc822 = tz tz(tz.now, "%Y-%m"), "+1 month", "-1 sunday", tz.rfc822

# Next sunday at 3.
zoned = tz "America/Detroit"
posix = zoned zoned(tz.now, "%Y-%m-%d 15:00"), "+1 sunday"
