const d3 = require("d3")

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

  /* Striped circle */

  const reversetestsrcColours = [...testsrcColours].reverse()
  const n = 8

  const circle = g.append("circle")
                    .attr("r", height / 1.78)
                    .attr("cx", width / 2)
                    .attr("cy", height / 2)
                    .attr("fill", "none")
                    .attr('id', 'clipper')

  const clipPath = g.append('clipPath')
    .attr('id',"clip")
      .append("use")
    .attr("xlink:href","#clipper");

  const bars = g.selectAll('bars')
      .data(d3.range(n))
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (width / n) )
      .attr('y', y)
      .attr('width', width / n)
      .attr('height', height)
      .attr('fill', (d, i) => reversetestsrcColours[i])
      .attr("clip-path", "url(#clip)")

  /* Rainbow bar */

  const gradient = g.append('linearGradient')
     .attr('id', 'rainbowGrad')
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

    const rainbowBar = g.append('rect')
      .attr('class', 'rainbow-bar')
      .attr('x', x)
      .attr('y', y + (height * 0.75))
      .attr('width', width)
      .attr('height', height * 0.125)
      .attr('fill', 'url(#rainbowGrad)')

  /* Black counting square */

    // Black background
    g.append('rect')
        .attr('class', 'black-count')
        .attr('x', width * 0.8)
        .attr('y', height * 0.4)
        .attr('width', barWidth * 0.7)
        .attr('height', height * 0.2)
        .attr('fill', 'black')

    // Top of '1'
    g.append('rect')
        .attr('class', 'white-count')
        .attr('x', (width * 0.8) + (barWidth * 0.6))
        .attr('y', (height * 0.4) + (height * 0.02))
        .attr('width', barWidth * 0.1)
        .attr('height', height * 0.07)
        .attr('fill', 'white')

    // Bottom of '1'
    g.append('rect')
        .attr('class', 'white-count')
        .attr('x', (width * 0.8) + (barWidth * 0.6))
        .attr('y', (height * 0.5) + (height * 0.01))
        .attr('width', barWidth * 0.1)
        .attr('height', height * 0.07)
        .attr('fill', 'white')
}

module.exports = drawFFmpegTestsrc
