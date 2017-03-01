/* COLOURS */

// General
const semiBlack = '#1f1f1f'
const grey15 = '#252525'
const grey40 = '#656565'
const smpteBlue = '#003d67'
const smptePurple = '#3d0076'

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
const smpteColours = [...colourValues]
smpteColours[0] = 'lightgrey'

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


function drawFFmpegTestsrc(x, y, width, height) {
  console.log("test")
  const svg = d3.select('#testsrc')
  const g = svg.append('g')
  const barWidth = width / 8
  const testsrcColours = ['black', 'red', 'lawngreen', 'yellow', 'blue', 'magenta', 'cyan', 'white']

  /* Background stripes */
  d3.range(8).forEach((d, i) => {
    g.append('rect')
        .attr('x', x + (d * barWidth))
        .attr('y', y)
        .attr('width', barWidth)
        .attr('height', height)
        .attr('fill', testsrcColours[i])
  })

  /* Circle */

  // const reversetestsrcColours = [...testsrcColours].reverse()
  const n = 6
  var color = ["#111","#222","#333","#444","#555","#666"]

  const circle = g.append("circle")
                    // .attr("r", height / 1.78) // Actual height
                    .attr("r", height / 2)
                    .attr("cx", width / 2)
                    .attr("cy", height / 2)
                    // .attr("fill", "lightblue") // This fill works
                    .attr("fill", "none")
                    .attr('id', 'clipper')

  const clipPath = svg.append('clipPath')
    .attr('id',"clip")
      .append("use")
    .attr("xlink:href","#clipper");

  const rects = svg.selectAll('rect')
      .data(d3.range(n))
      .enter()
      .append('rect')
      .attr('x', function(d,i) { return i * width / n })
      .attr('y', 0)
      .attr('width', width/n)
      .attr('height', 500)
      .attr('fill', function(d,i) { return color[i]; })
      .attr("clip-path", "url(#clip)")

  /* Rainbow bar */

  var gradient = g.append('linearGradient')
     .attr('id', 'testsrcGrad')
     .attr('x1', '0')
     .attr('x2', '1')
     .attr('y1', '0')
     .attr('y2', '0')

    gradient.selectAll("stop")
      .data([
          {offset: "0%", colour: "lawngreen"},
          {offset: "17%", colour: "cyan"},
          {offset: "33%", colour: "blue"},
          {offset: "50%", colour: "magenta"},
          {offset: "66%", colour: "red"},
          {offset: "83%", colour: "yellow"},
          {offset: "100%", colour: "lawngreen"}
        ])
      .enter().append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.colour)

    g.append('rect')
      .attr('x', x)
      .attr('y', y + (height * 0.75))
      .attr('width', width)
      .attr('height', height * 0.125)
      .attr('fill', 'url(#testsrcGrad)')

  /* Black counting square */

    // Black background
    g.append('rect')
        .attr('x', width * 0.8)
        .attr('y', height * 0.4)
        .attr('width', barWidth * 0.7)
        .attr('height', height * 0.2)
        .attr('fill', 'black')

    // Top of '1'
    g.append('rect')
        .attr('x', (width * 0.8) + (barWidth * 0.6))
        .attr('y', (height * 0.4) + (height * 0.02))
        .attr('width', barWidth * 0.1)
        .attr('height', height * 0.07)
        .attr('fill', 'white')

    // Bottom of '1'
    g.append('rect')
        .attr('x', (width * 0.8) + (barWidth * 0.6))
        .attr('y', (height * 0.5) + (height * 0.01))
        .attr('width', barWidth * 0.1)
        .attr('height', height * 0.07)
        .attr('fill', 'white')
}


function drawHDColourBars (x, y, width, height) {
  const svg = d3.select('#smpte-cb-hd')
  const g = svg.append('g')
  const barWidth = (width * 0.75) / 7
  const cornerBlock = width * 0.125

  /* Background (also bottom left/right squares) */
  g.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', grey15)

  /* TOP SECTION - 60% of HEIGHT */

    // 40% grey background ()= grey sidebars in top section)
    g.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height * 0.6)
        .attr('fill', grey40)

    // Middle colour bars
    d3.range(7).forEach((d, i) => {
      g.append('rect')
          .attr('x', x + cornerBlock + (d * barWidth))
          .attr('y', y)
          .attr('width', barWidth)
          .attr('height', height * 0.6)
          .attr('fill', smpteColours[i])
    })

  /* MIDDLE SECTION - 20% of HEIGHT. L-R */

    // Top ribbon, first block
    g.append('rect')
    .attr('x', x)
    .attr('y', y + (height * 0.6))
    .attr('width', cornerBlock)
    .attr('height', height * 0.1)
    .attr('fill', 'cyan')

    // Top ribbon, second block
    g.append('rect')
    .attr('x', x + cornerBlock)
    .attr('y', y + (height * 0.6))
    .attr('width', barWidth)
    .attr('height', height * 0.1)
    .attr('fill', smpteBlue)

    // Top ribbon, third block (long grey)
    g.append('rect')
    .attr('x', x + cornerBlock + barWidth)
    .attr('y', y + (height * 0.6))
    .attr('width', barWidth * 6)
    .attr('height', height * 0.1)
    .attr('fill', 'lightgrey')

    // Top ribbon, last block
    g.append('rect')
    .attr('x', x + (width * 0.875))
    .attr('y', y + (height * 0.6))
    .attr('width', cornerBlock)
    .attr('height', height * 0.1)
    .attr('fill', 'blue')

    // Bottom ribbon, first block
    g.append('rect')
    .attr('x', x)
    .attr('y', y + (height * 0.7))
    .attr('width', cornerBlock)
    .attr('height', height * 0.1)
    .attr('fill', 'yellow')

    // Bottom ribbon, second block
    g.append('rect')
    .attr('x', x + cornerBlock)
    .attr('y', y + (height * 0.7))
    .attr('width', barWidth)
    .attr('height', height * 0.1)
    .attr('fill', smptePurple)

    // Bottom ribbon, third block (gradient)

      var gradient = g.append('linearGradient')
       .attr('id', 'hdGradient')
       .attr('x1', '0')
       .attr('x2', '1')
       .attr('y1', '0')
       .attr('y2', '0')

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'black')
        .attr('stop-opacity', 1)

      gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', 'white')
          .attr('stop-opacity', 1)

          g.append('rect')
          .attr('x', x + cornerBlock + barWidth)
          .attr('y', y + (height * 0.7))
          .attr('width', barWidth * 6)
          .attr('height', height * 0.1)
          .attr('fill', 'url(#hdGradient)')

    // Bottom ribbon, last block
    g.append('rect')
    .attr('x', x + (width * 0.875))
    .attr('y', y + (height * 0.7))
    .attr('width', cornerBlock)
    .attr('height', height * 0.1)
    .attr('fill', 'red')

  /* BOTTOM SECTION - 20% of HEIGHT. L-R */

    // First black patch
    g.append('rect')
    .attr('x', x + cornerBlock)
    .attr('y', y + (height * 0.8))
    .attr('width', barWidth * 1.5)
    .attr('height', height * 0.2)
    .attr('fill', semiBlack)

    // White patch
    g.append('rect')
    .attr('x', x + cornerBlock + barWidth * 1.5)
    .attr('y', y + (height * 0.8))
    .attr('width', barWidth * 2)
    .attr('height', height * 0.2)
    .attr('fill', 'white')

    // Second black patch
    g.append('rect')
    .attr('x', x + cornerBlock + barWidth * 3.5)
    .attr('y', y + (height * 0.8))
    .attr('width', barWidth)
    .attr('height', height * 0.2)
    .attr('fill', semiBlack)

    // Sequence of five black bars
    d3.range(5).forEach((d, i) => {
      const smpteBlacks = ['black', semiBlack, '#2f2f2f', semiBlack, '#343434']
      const middleSectionWidth = (width * 0.75)
      const middleLeftBlock = (middleSectionWidth / 7) * 4.5
      g.append('rect')
        .attr('x', x + cornerBlock + middleLeftBlock + d * (barWidth * 1.5) / 5)
        .attr('y', y + (height * 0.8))
        .attr('width', (barWidth * 1.5) / 5)
        .attr('height', height * 0.2)
        .attr('fill', smpteBlacks[i])
    })

    // Third & last black patch
    g.append('rect')
    .attr('x', x + (width * 0.125) + barWidth * 6)
    .attr('y', y + (height * 0.8))
    .attr('width', barWidth)
    .attr('height', height * 0.2)
    .attr('fill', semiBlack)
}

/* CALL FUNCTIONS */

drawEBUColourBars(0, 0, 768, 576)
drawSMPTEColourBars(0, 0, 768, 576)
drawHDColourBars(0, 0, 1280, 720)
drawFFmpegTestsrc(0, 0, 720, 576)
