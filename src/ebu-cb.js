const d3 = require("d3")
const colourValues = require('./maincolours').colourValues

function drawEBUColourBars (x, y, width, height) {
  const svg = d3.select('#ebu-cb')
  const g = svg.append('g')

  g.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'lightblue') // TO CHANGE

  d3.range(8).forEach((d, i) => {
    g.append('rect')
      .attr('x', x + d * width / 8)
      .attr('y', y)
      .attr('width', width / 8)
      .attr('height', height)
      .attr('fill', colourValues[i])
  })
}

module.exports = drawEBUColourBars
