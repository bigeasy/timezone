npm_copy_targets = timezone/rfc822.js timezone/package.json timezone/synopsis.js timezone/README.md \
	timezone/CHANGELOG timezone/loaded.js

copy_sources = $(npm_copy_targets:timezone/%=%) timezone.js slurp.js
locale_sources = $(wildcard locales/*.js)
locale_targets = $(locale_sources:locales/%=timezone/%)

npm_targets = timezone/index.js $(npm_copy_targets) timezone/locales.js timezone/zones.js $(locale_targets) \
	timezone/America/Detroit.js zones/transitions.txt

olson_as_json = zones/olson/africa.js zones/olson/antarctica.js zones/olson/asia.js zones/olson/australasia.js \
	zones/olson/europe.js zones/olson/northamerica.js zones/olson/southamerica.js
olson = $(olson_as_json:zones/olson/%.js=eggert/tz/%)

sources = $(locale_targets) $(copy_sources)

all: zones/zoneinfo/America/Detroit $(npm_targets)

zic: eggert/tz/zic

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

eggert/tz/zic: 
	make -C eggert/tz -f Makefile	

zones/zoneinfo/America/Detroit: eggert/tz/africa
	mkdir -p zones
	@(cd eggert/tz && echo "Using zic: $$(which ./zic || which zic)")
	(cd eggert/tz && $$(which ./zic || which zic) -d ../../zones/zoneinfo africa antarctica asia australasia europe northamerica southamerica)

zones/olson/%.js: eggert/tz/%
	mkdir -p zones/olson
	node utility/tz2json.js $< > $@
	touch $@

timezone/index.js: timezone.js
	mkdir -p timezone
	cp timezone.js timezone/index.js

$(npm_copy_targets): timezone/%: %
	mkdir -p timezone
	cp $< $@

clean:
	rm -rf zones timezone
	make -C eggert/tz -f Makefile clean
