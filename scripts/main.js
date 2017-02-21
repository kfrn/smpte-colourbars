function drawEBUColourBars(x, y, width, height) {
  const svg = d3.select("#ebu-cb")
  const g = svg.append("g")

  g.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "lightblue")

  d3.range(8).forEach(d => {
    g.append("rect")
      .attr("x", x + d * 2 * width / 8)
      .attr("y", y)
      .attr("width", width / 8)
      .attr("height", height)
      .attr("fill", "rgba(0,0,0,0)")
      .attr("stroke", "black")
  })
}

function drawSMPTEColourBars(x, y, width, height) {
  const svg = d3.select("#smpte-cb")
  const g = svg.append("g")

  g.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "lightblue")
}

function drawHDColourBars(x, y, width, height) {
  const svg = d3.select("#smpte-cb-hd")
  const g = svg.append("g")

  g.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "lightblue")
}


drawEBUColourBars(0, 0, 768, 576)
drawSMPTEColourBars(0, 0, 768, 576)
drawHDColourBars(0, 0, 1280, 720)
