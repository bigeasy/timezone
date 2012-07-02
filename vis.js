var feature // eventually: all svg paths (countries) of the world
  , countries
  , toggle; // animation on/off control

var projection = d3.geo.azimuthal()
    .scale(680)
    .origin([-71.03,42.37])
    .mode("orthographic")
    .translate([1200, 400]);

var circle = d3.geo.greatCircle()
    .origin(projection.origin());

// TODO fix d3.geo.azimuthal to be consistent with scale
var scale =
{ orthographic: 380
, stereographic: 380
, gnomonic: 380
, equidistant: 380 / Math.PI * 2
, equalarea: 380 / Math.SQRT2
};

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#body").append("svg:svg")
    .attr("width",  1200)
    .attr("height", 300)
    .on("mousedown", mousedown);

if (frameElement) frameElement.style.height = '1200px';

//d3.json("world-countries.json", function(collection) {
d3.json("timezone-90.json", function(collection) {
  countries = collection;
  feature = svg.selectAll("path")
      .data(collection.features)
    .enter().append("svg:path")
      .attr('id', function(d) { return d.id; })
      .attr("d", clip);

  feature.append("svg:title")
      .text(function(d) { return d.properties.TZID; });

  startAnimation();
  d3.select('#animate').on('click', function () {
    if (done) startAnimation(); else stopAnimation();
  });
});

function stopAnimation() {
  done = true;
  d3.select('#animate').node().checked = false;
}

function startAnimation() {
  done = false;
  d3.timer(function() {
    var origin = projection.origin();
    origin = [origin[0] + .18, origin[1] + .06];
    projection.origin(origin);
    circle.origin(origin);
    refresh();
    d3.select('#positional').node().innerText = projection.invert([ 1200, 400 ]).join(' x ');
    return done;
  });
}

function animationState() {
  return 'animation: '+ (done ? 'off' : 'on');
}

d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

d3.select("select").on("change", function() {
  stopAnimation();
  projection.mode(this.value).scale(scale[this.value]);
  refresh(750);
});

var m0
  , o0
  , done
  ;

function mousedown() {
  stopAnimation();
  m0 = [d3.event.pageX, d3.event.pageY];
  o0 = projection.origin();
  d3.event.preventDefault();
}

function mousemove() {
  if (m0) {
    var m1 = [d3.event.pageX, d3.event.pageY]
      , o1 = [o0[0] + (m0[0] - m1[0]) / 8, o0[1] + (m1[1] - m0[1]) / 8];
    projection.origin(o1);
    circle.origin(o1);
    refresh();
  }
}

function mouseup() {
  if (m0) {
    mousemove();
    m0 = null;
  }
}

function refresh(duration) {
  (duration ? feature.transition().duration(duration) : feature).attr("d", clip);
}

function clip(d) {
  return path(circle.clip(d));
}

function reframe(css) {
  for (var name in css)
    frameElement.style[name] = css[name] + 'px';
}
