/* COLOURS */

// General
const semiBlack = '#1f1f1f'
const grey15 = '#252525'
const grey40 = '#656565'
const mainColours = { // At 75% intensity
  white: 'white',
  yellow: '#c4c400',
  cyan: '#00c4c3',
  green: '#00c400',
  magenta: '#c400c4',
  red: '#c40001',
  blue: '#0000c4',
  black: 'black'
}

// EBU colourbars
const colourValues = Object.keys(mainColours).map(key => mainColours[key])

// SMPTE colourbars
const SMPTEcolours = [...colourValues]
SMPTEcolours[0] = 'lightgrey'
const reverseBlueBars = [mainColours.blue, semiBlack, mainColours.magenta, semiBlack, mainColours.cyan, semiBlack, 'lightgrey']
const PLUGEcoloursLeft = ['#003d67', 'white', '#3d0076']
const PLUGEright = [Array(3).fill(semiBlack), 'black', semiBlack, '#313131', Array(3).fill(semiBlack)]
const PLUGEcoloursRight = [].concat(...PLUGEright)

/* FUNCTIONS */

function drawEBUColourBars (x, y, width, height) {
  const svg = d3.select('#ebu-cb')
  const g = svg.append('g')

  g.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'lightblue')

  d3.range(8).forEach((d, i) => {
    g.append('rect')
      .attr('x', x + d * width / 8)
      .attr('y', y)
      .attr('width', width / 8)
      .attr('height', height)
      .attr('fill', colourValues[i])
  })
}

function drawSMPTEColourBars (x, y, width, height) {
  const svg = d3.select('#smpte-cb')
  const g = svg.append('g')

  /* Standard EIA 75% amplitude white bars (67% of frame height) */
  d3.range(7).forEach((d, i) => {
    g.append('rect')
      .attr('x', x + d * width / 7)
      .attr('y', y)
      .attr('width', width / 7)
      .attr('height', height * 0.67)
      .attr('fill', SMPTEcolours[i])
  })

  /* Reverse blue bars (8% of frame height) */
  d3.range(7).forEach((d, i) => {
    g.append('rect')
      .attr('x', x + d * width / 7)
      .attr('y', y + height * 0.67)
      .attr('width', width / 7)
      .attr('height', height * 0.08)
      .attr('fill', reverseBlueBars[i])
  })

  /* PLUGE signal (25% of frame height) */

  // Left hand side: blue, white, purple
  d3.range(3).forEach((d, i) => {
    g.append('rect')
        .attr('x', x + d * ((width / 3) * 0.5))
        .attr('y', y + height * 0.75)
        .attr('width', (width / 3) * 0.5)
        .attr('height', height * 0.25)
        .attr('fill', PLUGEcoloursLeft[i])
  })

  // Middle black block
  const middleBlockWidth = 1 - 0.5 - (3 / 7)
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
        .attr('width', (width * 3 / 7) / 9)
        .attr('height', height * 0.25)
        .attr('fill', PLUGEcoloursRight[i])
  })
}

function drawHDColourBars (x, y, width, height) {
  const svg = d3.select('#smpte-cb-hd')
  const g = svg.append('g')

  /* Background (also bottom left/right squares) */
  g.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', grey15)

  /* Top section - 40% grey background */
  g.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height * 0.6)
      .attr('fill', grey40)

  /* Top section - middle colour bars */
  d3.range(7).forEach((d, i) => {
    const barWidth = 0.75 / 7
    g.append('rect')
        .attr('x', x + (width * 0.125) + (d * (width * 0.75) / 7))
        .attr('y', y)
        .attr('width', (width * 0.75) / 7)
        .attr('height', height * 0.6)
        .attr('fill', SMPTEcolours[i])
  })

  /* Middle - top ribbon */
  g.append('rect')
  .attr('x', x)
  .attr('y', y + (height * 0.6))
  .attr('width', width)
  .attr('height', height * 0.1)
  .attr('fill', 'purple')

  /* Middle - bottom ribbon */
  g.append('rect')
  .attr('x', x)
  .attr('y', y + (height * 0.7))
  .attr('width', width)
  .attr('height', height * 0.1)
  .attr('fill', 'blue')

  /* Bottom section */
  g.append('rect')
  .attr('x', x)
  .attr('y', y + (height * 0.8))
  .attr('width', width)
  .attr('height', height * 0.2)
  .attr('fill', 'lightgrey')

}

/* CALL FUNCTIONS */

drawEBUColourBars(0, 0, 768, 576)
drawSMPTEColourBars(0, 0, 768, 576)
drawHDColourBars(0, 0, 1280, 720)
