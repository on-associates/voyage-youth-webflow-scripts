# Voyage Youth
<br />
<br />

## Getting Started


Chance is a JavaScript generator of random [1] strings, numbers, etc.

main.js holds a set of functions that control the random image animation when hovering over buttons. At the bottom of this file are 2 arrays which loading images differently, either from Webflow projects as url's or locally from a folder, which for this case is commented out. For Webflow purposes it has to be a hard coded array because we can't specify a file path to look inside of Webflow assets.

cLoad adjusts the client height and available space in the browser.

<br />
<br />

### Updating scripts and deploying  

This script needs to be used externally with Webflow, because Webflow has a limitation of 10,000 characters and this library exceeds that. Every time you make changes, update script tags url for it to be functioning properly, in the steps provided below:

- Select the repository you want to use and copy the url, for example: https://github.com/on-associates/voyage-youth-webflow-scripts/blob/main/chance.min.js 
- Run through [JSDelivr](https://www.jsdelivr.com/) or [raw.githack](https://raw.githack.com) to create a cdn. 
- Insert the production url between the <script src=""></script> tags in Webflow.
