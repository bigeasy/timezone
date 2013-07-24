// http://www.html5rocks.com/en/tutorials/file/dndfiles/
d3.select('svg')
  .on('dragover', handleDragOver)
  .on('drop', handleFileSelect)
  ;

function handleFileSelect() {
  var event = d3.event
    , files = event.dataTransfer.files // FileList object
    , about = []
    , shape = null;
  event.stopPropagation();
  event.preventDefault();

  for (var i = 0, file; file = files[i]; i++) {
    // f.name, f.size, f.type (doesn't grok "json"), f.lastModifiedDate
    readGeojson(file, draw);
  }
}

function readGeojson(file, cb) {
  var reader = new FileReader;
  reader.onload = function(e) {
    cb(e.target.result, file);
  };
  reader.readAsText(file);
}

function handleDragOver() {
  var ev = d3.event;
  ev.stopPropagation();
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function draw(content, file) {
  var json = JSON.parse(content)
    , what = json.features;
  feature.data(countries.features = countries.features.concat(what))
    .enter().append('svg:path')
      .attr('id', function(d) { return d.id; })
      .attr('d', clip)
    .append('svg:title')
      .text(function(d) { return d.properties.name; });
  feature = svg.selectAll('path');
  refresh();
}
