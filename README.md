# ⚠ work in progress ⚠

## Video test patterns (colour bars)

#### Summary

The EBU and SMPTE colourbars constructed in SVG with D3.js. See the result [here](https://kfrn.github.io/smpte-colourbars/)!

#### Notes

* **SD colourbars** based on SMPTE EG 1-1990 ([IEEE link](http://ieeexplore.ieee.org/document/7291491/)).  
Constructed from specs given in [this document](http://www.xilinx.com/support/documentation/application_notes/xapp514.pdf) (page 359, figure 17.5).

* **HD colourbars** based on SMPTE RP 219-2002 ([IEEE link](http://ieeexplore.ieee.org/document/7289865/)).  
Based on ffmpeg's SMPTE HD colourbars and the diagram in [this document](http://uglyduck.ath.cx/PDF/Xilinx/Spartan3/appnotes/xapp682.pdf) (page 5, figure 3).  
Proportions approximate, as buying the spec from the IEEE is USD 120, and I couldn't find public information.

* Reasonably colour-accurate (primaries and secondaries at 75% intensity), except for blacks, which are fudged to be able to readily see the contrast between the different black levels.

* Reference images [here](https://github.com/kfrn/smpte-colourbars/tree/master/reference-images).

##### FFmpeg commands to generate colour bars:  

* SD: `ffplay -f lavfi -i smptebars=size=720x576`
* HD: `ffplay -f lavfi -i smptehdbars=size=1280x720`
