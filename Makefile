root_copy_targets = timezone/package.json timezone/README.md timezone/CHANGELOG

src_copy_targets = timezone/synopsis.js timezone/rfc822.js timezone/loaded.js timezone/.npmignore

copy_sources = $(src_copy_targets:timezone/%=src/%) $(root_copy_targets:timezone/%=%) timezone.js src/common_index.js
locale_sources = $(wildcard src/locales/*.js)
locale_targets = $(locale_sources:src/locales/%=timezone/%)

npm_targets = timezone/index.js $(root_copy_targets) $(src_copy_targets) \
	timezone/locales.js timezone/zones.js $(locale_targets) \
	timezone/America/Detroit.js build/transitions.txt

olson_as_json = build/olson/africa.js build/olson/antarctica.js build/olson/asia.js build/olson/australasia.js \
	build/olson/europe.js build/olson/northamerica.js build/olson/southamerica.js
olson = $(olson_as_json:build/olson/%.js=eggert/tz/%)

sources = $(locale_targets) $(copy_sources)

all: build/zoneinfo/America/Detroit $(npm_targets)

zic: eggert/tz/zic

watch: all
	@inotifywait -q -m -e close_write $(sources) | while read line; do make --no-print-directory all; done;

$(locale_targets): timezone/%: src/locales/%
	mkdir -p timezone
	cp $< $@

timezone/zones.js: src/common_index.js
	mkdir -p timezone
	cp $< $@
	cp $< $@

timezone/locales.js: src/common_index.js
	mkdir -p timezone
	cp $< $@

build/olson/index.js: src/common_index.js
	mkdir -p timezone
	cp $< $@

build/transitions.txt: $(olson_as_json) build/olson/index.js utility/verifiable.js
	node utility/verifiable.js > build/transitions.txt
	touch $@

timezone/America/Detroit.js: $(olson_as_json) build/olson/index.js utility/zones.js
	node utility/zones.js
	for dir in $$(find timezone -mindepth 1 -type d); do \
		cp src/common_index.js $$dir/index.js; \
	done
	touch $@

eggert/tz/zic: 
	make -C eggert/tz -f Makefile	

build/zoneinfo/America/Detroit: eggert/tz/africa
	mkdir -p zones
	@(cd eggert/tz && echo "Using zic: $$(which ./zic || which zic)")
	(cd eggert/tz && $$(which ./zic || which zic) -d ../../build/zoneinfo africa antarctica asia australasia europe northamerica southamerica)

build/olson/%.js: eggert/tz/%
	mkdir -p build/olson
	node utility/tz2json.js $< > $@
	touch $@

timezone/index.js: src/timezone.js
	mkdir -p timezone
	cp $< $@

$(src_copy_targets): timezone/%: src/%
	mkdir -p timezone
	cp $< $@

$(root_copy_targets): timezone/%: %
	mkdir -p timezone
	cp $< $@

clean:
	rm -rf build timezone
	make -C eggert/tz -f Makefile clean
