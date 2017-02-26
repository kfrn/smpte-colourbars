## Video test patterns (colour bars)

#### Summary

The EBU and SMPTE colourbars constructed in SVG with D3.js. See the result [here](https://kfrn.github.io/smpte-colourbars/)!

#### The patterns

* **Basic colourbars**. Full field colour bars, aka [EBU colour bars](https://zh.wikipedia.org/wiki/File:EBU_Colorbars.svg) (spec unknown).

* **SD colourbars**. Based on SMPTE EG 1-1990 ([IEEE link](http://ieeexplore.ieee.org/document/7291491/)).  
Constructed from specs given in [this document](http://www.xilinx.com/support/documentation/application_notes/xapp514.pdf) (page 359, figure 17.5).

* **FFmpeg's `testsrc`**  
"[`testsrc`](https://ffmpeg.org/ffmpeg-filters.html#allrgb_002c-allyuv_002c-color_002c-haldclutsrc_002c-nullsrc_002c-rgbtestsrc_002c-smptebars_002c-smptehdbars_002c-testsrc_002c-testsrc2_002c-yuvtestsrc) generates a test video pattern, showing a color pattern, a scrolling gradient and a timestamp."

* **HD colourbars**. Based on SMPTE RP 219-2002 ([IEEE link](http://ieeexplore.ieee.org/document/7289865/)).  
Based on ffmpeg's SMPTE HD colourbars and the diagram in [this document](http://uglyduck.ath.cx/PDF/Xilinx/Spartan3/appnotes/xapp682.pdf) (page 5, figure 3).  
  * Proportions approximate, I couldn't find public information on this, and buying the spec from the IEEE is USD 120.

#### Notes

* **Not really colour-accurate**: most colours are relatively accurate (via ffmpeg's test patterns), but blacks are fudged to be able to readily see the contrast between the different levels.

* **Reference images** are located [here](https://github.com/kfrn/smpte-colourbars/tree/master/reference-images).

##### FFmpeg commands to generate colour bars:  

* SMPTE SD: `ffplay -f lavfi -i smptebars=size=720x576`
* testsrc: `ffplay -f lavfi -i testsrc`
* SMPTE HD: `ffplay -f lavfi -i smptehdbars=size=1280x720`
