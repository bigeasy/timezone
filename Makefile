all: index.html

watch: all
	@inotifywait -q -m -e close_write code/synopsis.js | while read line; do make --no-print-directory all; done;

index.html: code/synopsis.js
	docco code/synopsis.js
	mv docs/synopsis.html index.html
