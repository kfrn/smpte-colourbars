const d3 = require("d3")
const colourValues = require('./maincolours').colourValues
const mainColours = require('./maincolours').mainColours

const smpteColours = [...colourValues]
smpteColours[0] = 'lightgrey'
const semiBlack = '#1f1f1f'
const smpteBlue = '#003d67'
const smptePurple = '#3d0076'

function drawSMPTEColourBars (x, y, width, height) {
  const svg = d3.select('#smpte-cb')
  const g = svg.append('g')
  const bar7 = width / 7
  const bar6 = width / 6

  /* Standard EIA 75% amplitude white bars (67% of frame height) */
  d3.range(7).forEach((d, i) => {
    g.append('rect')
      .attr('x', x + d * bar7)
      .attr('y', y)
      .attr('width', bar7)
      .attr('height', height * 0.67)
      .attr('fill', smpteColours[i])
  })

  /* Reverse blue bars (8% of frame height) */
  d3.range(7).forEach((d, i) => {
    const reverseBlueBars = [mainColours.blue, semiBlack, mainColours.magenta, semiBlack, mainColours.cyan, semiBlack, 'lightgrey']
    g.append('rect')
      .attr('x', x + d * bar7)
      .attr('y', y + height * 0.67)
      .attr('width', bar7)
      .attr('height', height * 0.08)
      .attr('fill', reverseBlueBars[i])
  })

  /* PLUGE signal (25% of frame height) */

  const PLUGEcoloursLeft = [smpteBlue, 'white', smptePurple]
  const PLUGEright = [Array(3).fill(semiBlack), 'black', semiBlack, '#313131', Array(3).fill(semiBlack)]
  const PLUGEcoloursRight = [].concat(...PLUGEright)

    // Left hand side: blue, white, purple
    d3.range(3).forEach((d, i) => {
      g.append('rect')
          .attr('x', x + d * bar6)
          .attr('y', y + height * 0.75)
          .attr('width', bar6)
          .attr('height', height * 0.25)
          .attr('fill', PLUGEcoloursLeft[i])
    })

    // Middle black block (thin)
    const middleBlockWidth = 0.5 - (3 / 7)
    g.append('rect')
        .attr('x', x + (0.5 * width))
        .attr('y', y + (height * 0.75))
        .attr('width', width * middleBlockWidth)
        .attr('height', height * 0.25)
        .attr('fill', semiBlack)

    // Right hand side: black/superblack/light black central block
    d3.range(9).forEach((d, i) => {
      g.append('rect')
          .attr('x', x + (width * (4 / 7)) + (d * (width * (3 / 7)) / 9))
          .attr('y', y + height * 0.75)
          .attr('width', (bar7 * 3) / 9)
          .attr('height', height * 0.25)
          .attr('fill', PLUGEcoloursRight[i])
  })
}

module.exports = drawSMPTEColourBars
