const drawEBUColourBars = require('./ebu-cb')
const drawSMPTEColourBars = require('./smpte-cb')
const drawFFmpegTestsrc = require('./ffmpeg-testsrc')
const drawHDColourBars = require('./hd-cb')

drawEBUColourBars(0, 0, 768, 576)
drawSMPTEColourBars(0, 0, 768, 576)
drawFFmpegTestsrc(0, 0, 720, 576)
drawHDColourBars(0, 0, 1280, 720)
