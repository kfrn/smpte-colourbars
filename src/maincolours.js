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

const colourValues = Object.keys(mainColours).map(key => mainColours[key])

module.exports = {
  mainColours,
  colourValues
}
