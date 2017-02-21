const mainColours = {
  white: "white",
  yellow: "#c4c400",
  cyan: "#00c4c3",
  green: "#00c400",
  magenta: "#c400c4",
  red: "#c40001",
  blue: "#0000c4",
  black: "black"
}

const colourValues = Object.keys(mainColours)
                           .map(key => mainColours[key])


function drawEBUColourBars(x, y, width, height) {
  const svg = d3.select("#ebu-cb")
  const g = svg.append("g")

  g.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "lightblue")

  d3.range(8).forEach((d, i) => {
    g.append("rect")
      .attr("x", x + d * width / 8)
      .attr("y", y)
      .attr("width", width / 8)
      .attr("height", height)
      .attr("fill", colourValues[i])
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
