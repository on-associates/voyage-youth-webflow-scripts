Voyage Youth
<br />
<br />

## Getting Started


#### Chance is a JavaScript generator of random [1] strings, numbers, etc.

#### Main holds a set of functions that control the image animation when hovering buttons. At the end there are 2 ways of loading images, from a local folder and hard coding an array for Webflow purposes because we can't specify a file path inside Webflow.

#### cLoad adjusts the client height and available space in the browser.


### Updating scripts and deploying  

This script needs to be used externally with Webflow, because Webflow has a limitation of 10,000 characters and this library exceeds that. Every time you make changes, update script tags url for it to be functioning properly, in the steps provided below:

- Select the repository you want to use and copy the url, for example: https://github.com/on-associates/voyage-youth-webflow-scripts/blob/main/chance.min.js 
- Run through [JSDelivr](https://www.jsdelivr.com/) or [raw.githack](https://raw.githack.com) to create a cdn. 
- Insert the production url between the <script src=""></script> tags in Webflow.
