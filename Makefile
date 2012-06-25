npm_copy_targets = timezone/rfc822.js timezone/package.json timezone/synopsis.js timezone/README \
	timezone/CHANGELOG timezone/loaded.js

copy_sources = $(npm_copy_targets:timezone/%=%) timezone.js slurp.js
locale_sources = $(wildcard locales/*.js)
locale_targets = $(locale_sources:locales/%=timezone/%)

npm_targets = timezone/index.js $(npm_copy_targets) timezone/locales.js timezone/zones.js $(locale_targets) \
	timezone/America/Detroit.js zones/transitions.txt

olson_as_json = zones/olson/africa.js zones/olson/antarctica.js zones/olson/asia.js zones/olson/australasia.js \
	zones/olson/europe.js zones/olson/northamerica.js zones/olson/southamerica.js
olson = $(olson_as_json:zones/olson/%.js=zones/src/%)

sources = $(locale_targets) $(copy_sources)

all: zones/zoneinfo/America/Detroit $(npm_targets)

zic: zones/src/zic

watch: all
	@inotifywait -q -m -e close_write $(sources) | while read line; do make --no-print-directory all; done;

$(locale_targets): timezone/%: locales/%
	mkdir -p timezone
	cp $< $@

timezone/zones.js: slurp.js
	mkdir -p timezone
	cp $< $@
	cp $< $@

timezone/locales.js: slurp.js
	mkdir -p timezone
	cp $< $@

zones/olson/index.js: slurp.js
	mkdir -p timezone
	cp $< $@

zones/transitions.txt: $(olson_as_json) zones/olson/index.js utility/verifiable.js
	node utility/verifiable.js > zones/transitions.txt
	touch $@

timezone/America/Detroit.js: $(olson_as_json) zones/olson/index.js utility/zones.js
	node utility/zones.js
	for dir in $$(find timezone -mindepth 1 -type d); do \
		cp slurp.js $$dir/index.js; \
	done
	touch $@

zones/tar/tzdata2012c.tar.gz:
	mkdir -p zones/tar
	rm -f zones/tar/tzdata2012c.*
	curl -s http://www.iana.org/time-zones/repository/releases/tzdata2012c.tar.gz > zones/tar/tzdata2012c.tar.gz.tmp
	[ "$$(cat zones/tar/tzdata2012c.tar.gz.tmp | $$(which md5sum || which md5) | cut -f1 -d' ')" = "cfdc2710bd05c26dbd624441d57028f6" ] && mv zones/tar/tzdata2012c.tar.gz.tmp $@

zones/tar/tzcode2012b.tar.gz:
	mkdir -p zones/tar
	rm -f zones/tar/tzcode2012b.*
	curl -s http://www.iana.org/time-zones/repository/releases/tzcode2012b.tar.gz > zones/tar/tzcode2012b.tar.gz.tmp
	[ "$$(cat zones/tar/tzcode2012b.tar.gz.tmp | $$(which md5sum || which md5) | cut -f1 -d' ')" = "6137322ffd36e1fd5128885be1c57008" ] && mv zones/tar/tzcode2012b.tar.gz.tmp $@

zones/src/Makefile: zones/tar/tzcode2012b.tar.gz
	mkdir -p zones/src
	[ -e $@ ] || tar -C zones/src -zxf $<
	touch $@

zones/src/zic: zones/src/Makefile zones/src/yearistype.sh
	make -C zones/src -f Makefile	
	touch $@

zones/zoneinfo/America/Detroit: zones/src/africa
	(cd zones/src && $$(which ./zic || which zic) -d ../zoneinfo africa antarctica asia australasia europe northamerica southamerica)

zones/src/%: zones/tar/tzdata2012c.tar.gz
	mkdir -p zones/src
	[ -e $@ ] || tar -C zones/src -zxf $<
	touch $@

zones/olson/%.js: zones/src/%
	mkdir -p zones/olson
	node utility/tz2json.js $< > $@
	touch $@

$(olson): zones/tar/tzdata2012c.tar.gz

timezone/index.js: timezone.js
	mkdir -p timezone
	cp timezone.js timezone/index.js

$(npm_copy_targets): timezone/%: %
	mkdir -p timezone
	cp $< $@

clean:
	rm -rf zones timezone
