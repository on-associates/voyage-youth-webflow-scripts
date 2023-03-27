# Voyage Youth
<br />
<br />

## Getting Started


Chance is a JavaScript generator of random [1] strings, numbers, etc.

main.js holds a set of functions that control the random image animation when hovering over buttons. At the bottom of this file are 2 arrays which loading images differently, either from Webflow projects as url's or locally from a folder, which in this case is commented out. For Webflow purposes it has to be a hard coded array because we can't specify a file path to look inside of Webflow assets.

cLoad adjusts the client height and available space in the browser.

<br />
<br />

### Updating scripts and deploying  

These scripts need to be used externally with Webflow, because Webflow has a limitation of 10,000 characters and these javascript files exceed that. Every time you make changes, please remember to update <script src=""></script> tags url, in the steps provided below:

- Select the repository you want to use and copy the url, for example: https://github.com/on-associates/voyage-youth-webflow-scripts/blob/main/chance.min.js 
- Open this link: raw.githack and paste the url to create a cdn.
- Insert the production url between the <script src=""></script> tags in Webflow.
