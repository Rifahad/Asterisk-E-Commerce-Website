const hamburgerBtn = document.querySelector(".hamburger");
const mobilenavigationList = document.querySelector(".mobilenavigationList");
const mobilenavigation = document.querySelector(".mobilenavigation");
const logo = document.querySelector(".logo");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  mobilenavigationList.classList.toggle("active");
  mobilenavigation.classList.toggle("active");
  logo.classList.toggle("active");
});

const demoTrigger = document.querySelector(".demo-trigger");
const paneContainer = document.querySelector(".detail");

new Drift(demoTrigger, {
  paneContainer: paneContainer,
  inlinePane: false,
});

function changeImg(url) {
  document.querySelector(".mainFistImg").setAttribute("src", `${url}`);
  document.querySelector(".mainFistImg").setAttribute("data-zoom", `${url}`);
}

const filterBtn = document.querySelector(".fliterIcon");
const fliterMoblie = document.querySelector(".fliter-moblie");

filterBtn.addEventListener("click", () => {
  fliterMoblie.classList.toggle("active");
});

document.querySelector('.mainImg').addEventListener('mouseover', () => {
    document.querySelector('.detail').style.display = 'block';
});

document.querySelector('.mainImg').addEventListener('mouseout', () => {
    document.querySelector('.detail').style.display = 'none';
});