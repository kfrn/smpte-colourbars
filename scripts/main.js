/* SIMPLIFIED VERSION FOR TESTING!!! */

function drawFFmpegTestsrc(x, y, width, height) {
  const svg = d3.select('#testsrc')
  const g = svg.append('g')
  const barWidth = width / 8
  const testsrcColours = ['black', 'red', 'lawngreen', 'yellow', 'blue', 'magenta', 'cyan', 'white']

  /* Background */
  g.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      // .attr('fill', 'purple')
      .attr('fill', 'none')

  /* Striped circle */

  const reversetestsrcColours = [...testsrcColours].reverse()
  console.log(reversetestsrcColours);
  const n = 8
  // var color = ["#111","#222","#333","#444","#555","#666"]

  const circle = g.append("circle")
                    // .attr("r", height / 1.78) // Actual height
                    .attr("r", height / 2)
                    .attr("cx", width / 2)
                    .attr("cy", height / 2)
                    .attr("fill", "lightblue") // This fill works. Now (almost all) covered by stripes! :)
                    // .attr("fill", "none")
                    .attr('id', 'clipper')

  const clipPath = svg.append('clipPath')
    .attr('id',"clip")
      .append("use")
    .attr("xlink:href","#clipper");

  const rects = svg.selectAll('rect')
      .data(d3.range(n))
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (width / n) ) // Something funny here. First stripe is not black, but shows the lightblue background!
      .attr('y', y)
      .attr('width', width / n)
      .attr('height', height)
      .attr('fill', (d, i) => reversetestsrcColours[i])
      .attr("clip-path", "url(#clip)")
}

drawFFmpegTestsrc(0, 0, 720, 576)
