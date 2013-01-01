root_copy_targets = build/timezone/package.json build/timezone/README.md build/timezone/CHANGELOG

src_copy_targets = build/timezone/synopsis.js build/timezone/rfc822.js build/timezone/loaded.js build/timezone/.npmignore

copy_sources = $(src_copy_targets:build/timezone/%=src/%) $(root_copy_targets:build/timezone/%=%) timezone.js src/common_index.js
locale_sources = $(wildcard src/locales/*.js)
locale_targets = $(locale_sources:src/locales/%=build/timezone/%)

npm_targets = build/timezone/index.js $(root_copy_targets) $(src_copy_targets) \
	build/timezone/locales.js build/timezone/zones.js $(locale_targets) \
	build/timezone/America/Detroit.js build/transitions.txt

olson_as_json = build/olson/africa.js build/olson/antarctica.js build/olson/asia.js build/olson/australasia.js \
	build/olson/europe.js build/olson/northamerica.js build/olson/southamerica.js
olson = $(olson_as_json:build/olson/%.js=eggert/tz/%)

sources = $(locale_targets) $(copy_sources)

all: build/zoneinfo/America/Detroit $(npm_targets)

zic: eggert/tz/zic

watch: all
	@inotifywait -q -m -e close_write $(sources) | while read line; do make --no-print-directory all; done;

$(locale_targets): build/timezone/%: src/locales/%
	mkdir -p build/timezone
	cp $< $@

build/timezone/zones.js: src/common_index.js
	mkdir -p build/timezone
	cp $< $@
	cp $< $@

build/timezone/locales.js: src/common_index.js
	mkdir -p build/timezone
	cp $< $@

build/olson/index.js: src/common_index.js
	mkdir -p build/timezone
	cp $< $@

build/transitions.txt: $(olson_as_json) build/olson/index.js util/verifiable.js
	node util/verifiable.js > build/transitions.txt
	touch $@

build/timezone/America/Detroit.js: $(olson_as_json) build/olson/index.js util/zones.js
	node util/zones.js
	for dir in $$(find build/timezone -mindepth 1 -type d); do \
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
	node util/tz2json.js $< > $@
	touch $@

build/timezone/index.js: src/timezone.js
	mkdir -p build/timezone
	cp $< $@

$(src_copy_targets): build/timezone/%: src/%
	mkdir -p build/timezone
	cp $< $@

$(root_copy_targets): build/timezone/%: %
	mkdir -p build/timezone
	cp $< $@

clean:
	rm -rf build
	make -C eggert/tz -f Makefile clean
