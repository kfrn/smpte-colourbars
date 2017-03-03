const d3 = require("d3")

function drawPM5544(x, y, width, height) {
  const svg = d3.select('#pm5544')
  const g = svg.append('g')

  /* Grey background */
  g.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'grey')

  /* Grid */
  const squareSize = height / 14
}

module.exports = drawPM5544
