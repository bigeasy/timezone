import java.util.TimeZone;
import java.util.Calendar;
import java.text.DateFormat;

/**
 * You can observe how Java handles a landing on an hour missing due to DST with
 * this program. The output is:
 *
 * <pre>
 * 3/14/10 1:30 AM
 * 3/14/10 1:30 AM
 * 3/14/10 3:30 AM
 * 3/14/10 1:30 AM
 * 3/14/10 3:30 AM
 * 3/14/10 3:30 AM
 * 3/14/10 3:00 AM
 * 3/14/10 1:59 AM
 * </pre>
 *
 * Going forward, landing on the missing 2:30 AM, an hour is subtracted. Going
 * backward, landing on the missing 2:30 AM, an hour is added.
 */
class Zones {
    public static void main(String[] args) {
        TimeZone tz = TimeZone.getTimeZone("America/Detroit");        

        Calendar calendar = Calendar.getInstance(tz);
        calendar.setTimeInMillis(0);

        DateFormat format = DateFormat.getInstance();
        format.setTimeZone(tz);

        // Moving by days is oddly different depending on direction.
        calendar.set(2010, 2, 13, 1, 30, 0);
        calendar.add(Calendar.DATE, +1);
        System.out.println(format.format(calendar.getTime()));

        calendar.set(2010, 2, 13, 2, 30, 0);
        calendar.add(Calendar.DATE, +1);
        System.out.println(format.format(calendar.getTime()));

        calendar.set(2010, 2, 13, 3, 30, 0);
        calendar.add(Calendar.DATE, +1);
        System.out.println(format.format(calendar.getTime()));

        calendar.set(2010, 2, 15, 1, 30, 0);
        calendar.add(Calendar.DATE, -1);
        System.out.println(format.format(calendar.getTime()));

        calendar.set(2010, 2, 15, 2, 30, 0);
        calendar.add(Calendar.DATE, -1);
        System.out.println(format.format(calendar.getTime()));

        // Moving by seconds is as expected.
        calendar.set(2010, 2, 15, 3, 30, 0);
        calendar.add(Calendar.DATE, -1);
        System.out.println(format.format(calendar.getTime()));

        calendar.set(2010, 2, 14, 1, 59, 59);
        calendar.add(Calendar.SECOND, +1);
        System.out.println(format.format(calendar.getTime()));

        calendar.set(2010, 2, 14, 3, 00, 0);
        calendar.add(Calendar.SECOND, -1);
        System.out.println(format.format(calendar.getTime()));
    }
}
