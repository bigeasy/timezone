all: timezones iana/zoneinfo/America/Detroit
	cp lib/indicies/timezones.js timezones/index.js
	node bin/forward.js
	for dir in $$(find zones -type d); do \
		cp lib/indicies/zones.js $$dir/index.js; \
	done
	node bin/display.js > iana/zones.txt
	bin/verify iana/zones.txt

iana/src/tzdata2012c.tar.gz:
	mkdir -p iana/src
	rm -f iana/src/tzdata2012c.*
	curl -s http://www.iana.org/time-zones/repository/releases/tzdata2012c.tar.gz > iana/src/tzdata2012c.tar.gz.tmp
	md5sum iana/src/tzdata2012c.tar.gz.tmp | cut -f1 -d' '
	[ "$$(md5sum iana/src/tzdata2012c.tar.gz.tmp | cut -f1 -d' ')" == "cfdc2710bd05c26dbd624441d57028f6" ] && mv iana/src/tzdata2012c.tar.gz.tmp $@

iana/src/tzcode2012b.tar.gz:
	mkdir -p iana/src
	rm -f iana/src/tzcode2012b.*
	curl -s http://www.iana.org/time-zones/repository/releases/tzcode2012b.tar.gz > iana/src/tzcode2012b.tar.gz.tmp
	md5sum iana/src/tzcode2012b.tar.gz.tmp | cut -f1 -d' '
	[ "$$(md5sum iana/src/tzcode2012b.tar.gz.tmp | cut -f1 -d' ')" == "6137322ffd36e1fd5128885be1c57008" ] && mv iana/src/tzcode2012b.tar.gz.tmp $@

iana/src/Makefile: iana/src/tzcode2012b.tar.gz
	tar -C iana/src -zxf $<
	touch $@

iana/src/zone.tab: iana/src/tzdata2012c.tar.gz
	tar -C iana/src -zxf $<
	touch $@

iana/src/zic: iana/src/Makefile
	make -C iana/src -f Makefile	
	touch $@

iana/zoneinfo/America/Detroit: iana/src/zic
	(cd iana/src && ./zic -d ../zoneinfo africa antarctica asia australasia europe northamerica southamerica)

iana/src/%: iana/src/zone.tab
	[ -e $@ ] && touch $@

timezones/%.js: iana/src/%
	mkdir -p timezones
	node bin/tz2json.js $< > $@

timezones: timezones/africa.js timezones/antarctica.js timezones/asia.js timezones/australasia.js \
	timezones/europe.js timezones/northamerica.js timezones/southamerica.js
