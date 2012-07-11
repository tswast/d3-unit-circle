// unitcircle.js : a d3.js project to draw a "unit circle"
// AUTHOR:  Tim Swast
// LICENCE: 2-clause BSD

var data = [
{
  "degrees": 0,
  "radians": "0",
  "cos": "1",
  "sin": "0"
},
{
  "degrees": 30,
  "radians": "\u03C0 / 6",
  "cos": "\u221A(3) / 2",
  "sin": "1 / 2"
},
{
  "degrees": 45,
  "radians": "\u03C0 / 4",
  "cos": "\u221A(2) / 2",
  "sin": "\u221A(2) / 2"
},
{
  "degrees": 60,
  "radians": "\u03C0 / 3",
  "cos": "1 / 2",
  "sin": "\u221A(3) / 2"
},
{
  "degrees": 90,
  "radians": "\u03C0 / 2",
  "cos": "0",
  "sin": "1"
},
{
  "degrees": 120,
  "radians": "2\u03C0 / 3",
  "cos": "-1 / 2",
  "sin": "\u221A(3) / 2"
},
{
  "degrees": 135,
  "radians": "3\u03C0 / 4",
  "cos": "-\u221A(2) / 2",
  "sin": "\u221A(2) / 2"
},
{
  "degrees": 150,
  "radians": "5\u03C0 / 6",
  "cos": "-\u221A(3) / 2",
  "sin": "1 / 2"
},
{
  "degrees": 180,
  "radians": "\u03C0",
  "cos": "-1",
  "sin": "0"
},
{
  "degrees": 210,
  "radians": "7\u03C0 / 6",
  "cos": "-\u221A(3) / 2",
  "sin": "-1 / 2"
},
{
  "degrees": 225,
  "radians": "5\u03C0 / 4",
  "cos": "-\u221A(2) / 2",
  "sin": "-\u221A(2) / 2"
},
{
  "degrees": 240,
  "radians": "4\u03C0 / 3",
  "cos": "-1 / 2",
  "sin": "-\u221A(3) / 2"
},
{
  "degrees": 270,
  "radians": "3\u03C0 / 2",
  "cos": "0",
  "sin": "-1"
},
{
  "degrees": 300,
  "radians": "5\u03C0 / 3",
  "cos": "1 / 2",
  "sin": "-\u221A(3) / 2"
},
{
  "degrees": 315,
  "radians": "7\u03C0 / 4",
  "cos": "\u221A(2) / 2",
  "sin": "-\u221A(2) / 2"
},
{
  "degrees": 330,
  "radians": "11\u03C0 / 6",
  "cos": "\u221A(3) / 2",
  "sin": "-1 / 2"
}
]

// convert degrees to radians
var dtor = Math.PI / 180;

// diagram sizes
var svg = d3.select("svg");
var center = svg.attr("height") / 2;
var radius = center * 0.7;

// make a circle
// to keep the conventional counter-clockwise direction
// I take -sin(theta) because the y-axis runs positive from top-down in svg
var groups = svg.selectAll("g").data(data).enter().append("g");
groups.append("circle")
    .style("stroke", "gray")
    .style("fill", "white")
    .attr("cx", function(d) {return Math.cos(d["degrees"] * dtor) * radius + center;})
    .attr("cy", function(d) {return -1 * Math.sin(d["degrees"] * dtor) * radius + center;})
    .attr("r", 10);

// add text on hover 
groups.on("mouseover", function()
  {
    var self = d3.select(this);
    if (self.select("text").empty()) {
      self.append("text")
        .style("text-anchor", "middle")
        .attr("x", function(d) {return Math.cos(d["degrees"] * dtor) * radius + center;})
        .attr("y", function(d) {return -1 * Math.sin(d["degrees"] * dtor) * radius + center;})
        .text(function(d) {
          return (
            d["radians"] + " (" + d["degrees"] + "\u00B0) : " +
            "( cos: " + d["cos"] + ", sin: " + d["sin"] + ")");
        });
    } else {
      self.select("text")
        .transition()
          .duration(250)
          .style("fill-opacity", 1);
    }
  });
groups.on("mouseout", function()
  {
    d3.select(this).select("text")
        .transition()
          .duration(1000)
          .style("fill-opacity", 0);
  });

