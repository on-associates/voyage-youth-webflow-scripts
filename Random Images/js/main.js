
/******************************************************************************/
/************************** CONSTANTS *****************************************/
/******************************************************************************/


// First two buttons
// Adjust the number of images that are used inside the frist two buttons
const NUM_WORK_IMAGES = 10;


// Third button
// Adjust the number of images that are used inside the third button
const NUM_WORSE_IMAGES = 19;

const IMG_OVERLAY_HANG_AMT = 0;

const WORK_CHANGE_TIMING = 1000; // 1000 == 1 second
const BETTER_CHANGE_TIMING = 150;
const WORSE_CHANGE_TIMING = 1500;

const SKEW_AMT = 150;

/******************************************************************************/
/************************** GLOBALS *******************************************/
/******************************************************************************/

// general use previously selected random image index
var lastImgInd;

/******************************************************************************/
/************************** HELPER FUNCTIONS **********************************/
/******************************************************************************/

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function stringToElement(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function elementToString(element) {
    var div = document.createElement('div');
    div.appendChild(element);
    return div.innerHTML;
}

/******************************************************************************/
/************************** VOYAGE **********************************************/
/******************************************************************************/

var overlayImgEl;
var showWorkInterval;

function showWorkStep() {
    var curImgInd = chance.integer({ min: 0, max: workImages.length - 1 });

    // make sure the same image isn't selected twice in a row
    while (typeof lastImgInd == "number" && lastImgInd == curImgInd)
        curImgInd = chance.integer({ min: 0, max: workImages.length - 1 });
    lastImgInd = curImgInd;
    var curImg = workImages[curImgInd];

    // decide image dimentions
    var imgHeight;
    var imgWidth;
    var curMult = chance.floating({ min: 0.25, max: 0.6 });
    if (window.innerWidth < window.innerHeight) {
        imgWidth = Math.floor(curMult * window.innerWidth);
        imgHeight = Math.floor((curImg.height / curImg.width) * imgWidth);
    }
    else {
        imgHeight = Math.floor(curMult * window.innerHeight);
        imgWidth = Math.floor((curImg.width / curImg.height) * imgHeight);
    }

    // constrain image dims to screen size
    if (window.innerWidth < imgWidth) {
        imgWidth = window.innerWidth;
        imgHeight = Math.floor((curImg.height / curImg.width) * imgWidth);
    }
    if (window.innerHeight < imgHeight) {
        imgHeight = window.innerHeight;
        imgWidth = Math.floor((curImg.width / curImg.height) * imgHeight);
    }

    // allow images to hang off-screen
    if (IMG_OVERLAY_HANG_AMT > 0) {
        var hHang = imgHeight / IMG_OVERLAY_HANG_AMT;
        var wHang = imgWidth / IMG_OVERLAY_HANG_AMT;
        overlayImgEl.style.top = chance.integer({ min: -hHang, max: window.innerHeight - imgHeight + hHang }) + "px";
        overlayImgEl.style.left = chance.integer({ min: -wHang, max: window.innerWidth - imgWidth + wHang }) + "px";
    }
    else {
        overlayImgEl.style.top = chance.integer({ min: 0, max: window.innerHeight - imgHeight }) + "px";
        overlayImgEl.style.left = chance.integer({ min: 0, max: window.innerWidth - imgWidth }) + "px";
    }

    // set image dimentions
    overlayImgEl.style.height = imgHeight + "px";
    overlayImgEl.style.width = imgWidth + "px";
    overlayImgEl.src = curImg.src;

    overlayImgEl.classList.remove("hidden");
}

function stopShowWork() {
    clearInterval(showWorkInterval);
    overlayImgEl.classList.add("hidden");
}

function startShowWork() {
    if (showWorkInterval) clearInterval(showWorkInterval);
    showWorkStep();
    showWorkInterval = setInterval(showWorkStep, WORK_CHANGE_TIMING);
}

function initWork() {
    var workEl = document.getElementsByClassName("work")[0];
    workEl.addEventListener("mouseenter", startShowWork);
    workEl.addEventListener("mouseleave", stopShowWork);
}

/******************************************************************************/
/************************** EMPOWER ********************************************/
/******************************************************************************/

var betterInterval;
var betterToUse;
var betterNumShown;

function betterStep() {
    if (betterToUse.length == 0)
        betterToUse = shuffle([...Array(NUM_WORK_IMAGES).keys()]);

    var curImg = workImages[betterToUse.splice(0, 1)[0]];

    // decide image dimentions
    var imgHeight;
    var imgWidth;
    var curMult = chance.floating({ min: 0.25, max: 0.6 });
    if (window.innerWidth < window.innerHeight) {
        imgWidth = Math.floor(curMult * window.innerWidth);
        imgHeight = Math.floor((curImg.height / curImg.width) * imgWidth);
    }
    else {
        imgHeight = Math.floor(curMult * window.innerHeight);
        imgWidth = Math.floor((curImg.width / curImg.height) * imgHeight);
    }

    // constrain image dims to screen size
    if (window.innerWidth < imgWidth) {
        imgWidth = window.innerWidth;
        imgHeight = Math.floor((curImg.height / curImg.width) * imgWidth);
    }
    if (window.innerHeight < imgHeight) {
        imgHeight = window.innerHeight;
        imgWidth = Math.floor((curImg.width / curImg.height) * imgHeight);
    }

    var curImgEl = document.createElement("img");
    curImgEl.classList.add("overlayImg");
    curImgEl.id = "better_" + betterNumShown;
    curImgEl.zIndex = 100 + betterNumShown;
    betterNumShown++;

    // allow images to hang off-screen
    if (IMG_OVERLAY_HANG_AMT > 0) {
        var hHang = imgHeight / IMG_OVERLAY_HANG_AMT;
        var wHang = imgWidth / IMG_OVERLAY_HANG_AMT;
        curImgEl.style.top = chance.integer({ min: -hHang, max: window.innerHeight - imgHeight + hHang }) + "px";
        curImgEl.style.left = chance.integer({ min: -wHang, max: window.innerWidth - imgWidth + wHang }) + "px";
    }
    else {
        curImgEl.style.top = chance.integer({ min: 0, max: window.innerHeight - imgHeight }) + "px";
        curImgEl.style.left = chance.integer({ min: 0, max: window.innerWidth - imgWidth }) + "px";
    }

    // set image dimentions
    curImgEl.style.height = imgHeight + "px";
    curImgEl.style.width = imgWidth + "px";
    curImgEl.src = curImg.src;

    document.body.appendChild(curImgEl);
}

function betterStopStep(i) {
    var curRem = document.getElementById("better_" + i);
    if (curRem) curRem.parentNode.removeChild(curRem);
}

function stopBetter() {
    clearInterval(betterInterval);
    for (var i = 0; i < betterNumShown; i++) betterStopStep(i);
}

function startBetter() {
    betterNumShown = 0;
    betterToUse = shuffle([...Array(NUM_WORK_IMAGES).keys()]);
    if (betterInterval) clearInterval(betterInterval);
    betterStep();
    betterInterval = setInterval(betterStep, BETTER_CHANGE_TIMING);
}

function initBetter() {
    var betterEl = document.getElementsByClassName("better")[0];
    betterEl.addEventListener("mouseenter", startBetter);
    betterEl.addEventListener("mouseleave", stopBetter);
}

/******************************************************************************/
/************************** TRANSFORM *********************************************/
/******************************************************************************/

var numSpans;
var worseEl
var savedBB = false;
var allowWorseStop = false;
var worseMouseOut = false;

var worseImagesInterval;

function skewSpanEl(ind) {
    window.requestAnimationFrame(function () {
        var spanEl = document.getElementById("animSpan_" + ind);
        spanEl.style.transform =
            "rotate3d(0,0,1," + chance.integer({ min: -90, max: 90 }) + "deg)";
        spanEl.style.webkitTransform =
            "rotate3d(0,0,1," + chance.integer({ min: -90, max: 90 }) + "deg)";
    });
}

function skewAllSpans() {
    for (var i = 0; i < numSpans; i++) skewSpanEl(i);
}

function worseImagesStep() {
    var curImgInd = chance.integer({ min: 0, max: worseImages.length - 1 });
    // make sure the same image isn't selected twice in a row
    while (typeof lastImgInd == "number" && lastImgInd == curImgInd)
        curImgInd = chance.integer({ min: 0, max: worseImages.length - 1 });
    lastImgInd = curImgInd;
    var curImg = worseImages[curImgInd];

    // decide image dimentions
    var curMult;
    if (window.innerWidth > 768) {
        curMult = chance.floating({ min: 0.5, max: 0.85 }); // greater than 768 pixels
    } else {
        curMult = chance.floating({ min: 0.5, max: 0.5 }); // smaller than or equal to 768 pixels
    }

    var imgHeight;
    var imgWidth;
    if (chance.bool()) {
        imgHeight = window.innerHeight * curMult;
        imgWidth = Math.floor((curImg.width / curImg.height) * imgHeight);
    }
    else {
        imgWidth = window.innerWidth * curMult;
        imgHeight = Math.floor((curImg.height / curImg.width) * imgWidth);
    }

    overlayImgEl.style.top = (-(imgHeight - window.innerHeight) / 2) + "px";
    overlayImgEl.style.left = window.innerWidth < 768 ? "5%" : (-(imgWidth - window.innerWidth) / 2) + "px";

    // set image dimentions
    overlayImgEl.style.height = imgHeight + "px";
    overlayImgEl.style.width = imgWidth + "px";
    overlayImgEl.src = curImg.src;

    overlayImgEl.classList.remove("hidden");
}

function startWorse() {
    if (savedBB) return;
    document.getElementById("info").classList.add("fixWorse");
    savedBB = worseEl.getBoundingClientRect();

    document.getElementById("info").classList.add("fixWorse");

    if (!worseImagesInterval) {
        worseImagesStep();
        worseImagesInterval = setInterval(worseImagesStep, WORSE_CHANGE_TIMING);
    }

    // skewAllSpans();
    worseMouseOut = false;
    allowWorseStop = false;

    if (!allowWorseStop) setTimeout(function () {
        allowWorseStop = true;
    }, 100);
}

function stopWorse(ev) {
    if (savedBB) {
        worseMouseOut = (ev.clientX < savedBB.left) || (ev.clientX > savedBB.left + savedBB.width) ||
            (ev.clientY < savedBB.top) || (ev.clientY > savedBB.top + savedBB.height);
        if (worseMouseOut && allowWorseStop) {
            document.getElementById("info").classList.remove("fixWorse");
            clearInterval(worseImagesInterval);
            worseImagesInterval = false;
            overlayImgEl.classList.add("hidden");
            for (var i = 0; i < numSpans; i++) {
                var spanEl = document.getElementById("animSpan_" + i);
                spanEl.style = null;
            }
            setTimeout(function () { savedBB = false }, 50);
        }
    }
}

function initWorse() {
    worseEl = document.getElementsByClassName("worse")[0];
    worseEl.addEventListener("mouseenter", startWorse);
    document.body.addEventListener("mousemove", stopWorse);
}

/******************************************************************************/
/************************** INITIALIZATION ************************************/
/******************************************************************************/

var workImages = [];
var worseImages = [];


/*
Load images for Webflow
*/

// First two buttons
var workImagesUrl = [
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f621892acd9521bf4cecd2_1.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f62189b260712f397ba8cd_3.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f6218a1df86fbd98f053ab_5.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f62189574d2c815d5b9055_6.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f6218ac2cc3be104d4bcd4_9.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f621892aa7fae6b533d367_12.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f622054c0c1baff2a98c5f_15.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f62205260a19bdf8b90371_16.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f62206ef2babfbd7c20cfd_17.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f62206eab0986812f5486f_18.PNG"
];


// Third button
var worseImagesUrl = [
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f6221bf91613d9384c5f74_26.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f6221bf79ae03287e0f759_27.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f6221bd22be977cac45c63_30.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f6221a2acd95ce064cf159_31.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f6221abcbe469d09b1741d_32.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f6220699a085e32d15d290_20.PNG",
    "https://uploads-ssl.webflow.com/63a4ab99799105459ca0c822/63f62206b2607134f37baaea_23.jpeg"
];


function preloadImages() {
    // load work images
    for (var i = 0; i < NUM_WORK_IMAGES; i++) {
        var img = new Image();
        img.onload = function () { workImages.push(this) }
        img.src = workImagesUrl[i];
    }

    // load worse images
    for (var i = 0; i < NUM_WORSE_IMAGES; i++) {
        var img = new Image();
        img.onload = function () { worseImages.push(this) }
        img.src = worseImagesUrl[i];;
    }
}


/*
Load images from a local folder

function preloadImages() {
    // load work images
    var baseWorkSrc = "img/button-one/";
    for (var i = 0; i < NUM_WORK_IMAGES; i++) {
        var img = new Image();
        img.onload = function () { workImages.push(this) }
        img.src = baseWorkSrc + i + ".png";
    }

    // load worse images
    var baseWorseSrc = "img/button-two/";
    for (var i = 0; i < NUM_WORSE_IMAGES; i++) {
        var img = new Image();
        img.onload = function () { worseImages.push(this) }
        img.src = baseWorseSrc + i + ".png";
    }
}
*/

function init() {
    preloadImages();
    overlayImgEl = document.getElementById("overlayImg");
    initWorse();
    initWork();
    initBetter();
}

init();
