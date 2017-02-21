### Video test patterns (colour bars)

Building the EBU and SMPTE colourbars in SVG with D3.js.

Reasonably colour-accurate (primaries and secondaries at 75% intensity), except for blacks, which are fudged to be able to readily see the contrast between regular black and the -4% (superblack) and +4% black levels.

**SD colourbars** based on SMPTE EG 1-1990 ([IEEE](http://ieeexplore.ieee.org/document/7291491/)).  
Constructed from specs given in [this document](http://www.xilinx.com/support/documentation/application_notes/xapp514.pdf), page 359, figure 17.5.

<!-- **HD colourbars** based on SMPTE RP 219-2002 ([IEEE link](http://ieeexplore.ieee.org/document/7289865/)).  
Based on diagram in [this document](http://uglyduck.ath.cx/PDF/Xilinx/Spartan3/appnotes/xapp682.pdf), page 5, figure 3.  
Proportions approximate, as buying the spec from the IEEE is USD 120, and I couldn't find public information. -->

FFmpeg-generated colour bars were also used as reference.
* SD: `ffplay -f lavfi -i smptebars=size=720x576`
* HD: `ffplay -f lavfi -i smptehdbars=size=1920x1080`
