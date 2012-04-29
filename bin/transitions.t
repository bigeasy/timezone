#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IANA="$( cd "$DIR/../iana" && pwd )"

count=0
while read line
do
  array=($line)
  utc=${array[2]}
  if [ "${utc%%-*}" -lt 1902 ]; then continue; fi
  let count=count+1
done < "$IANA/zones.txt"

#echo "1..$(expr $count '*' 2)"
echo "1..10000"

count=1
while read line
do
  if [ $count -eq 10001 ]; then break; fi
  array=($line)
  utc=${array[2]/T/ }
  if [ "${utc%%-*}" -lt 1902 ]; then continue; fi
  # Date cannot do zone shifts with to the second accuracy.
  before=$(TZ=":$IANA/zoneinfo/${array[0]}" date -d 'TZ="UTC" -1 minute '"$utc" +"%::z/%Z")
  after=$(TZ=":$IANA/zoneinfo/${array[0]}" date -d 'TZ="UTC" +1 minute '"$utc" +"%::z/%Z")
  if [ "$before" = "${array[3]}" ]
  then
    echo "ok ${count} # before ${array[0]} ${array[1]}"
  else
    echo "not ok ${count} ${array[0]} ${array[1]} ${array[2]} ${array[2]} != $before"
  fi
  let count=count+1
  if [ "$after" = "${array[4]}" ]
  then
    echo "ok ${count} # after ${array[0]} ${array[1]}"
  else
    echo "not ok ${count} ${array[0]} ${array[1]} ${array[2]} ${array[4]} != $after"
  fi
  let count=count+1
done < "$IANA/zones.txt"
