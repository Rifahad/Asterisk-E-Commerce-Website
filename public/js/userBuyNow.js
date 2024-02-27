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

const decBtn = document.querySelectorAll(".dec");
const incBtn = document.querySelectorAll(".inc");
const qty = document.querySelectorAll(".qtyOne");
const lPrice = document.querySelectorAll(".lPrice");
const fPrice = document.querySelectorAll(".fPrice");
const sTotal = document.querySelector("#sTotal");
const dPrice = document.querySelector("#dPrice");
const tPrice = document.querySelector("#tPrice");

const noOfPro = document.querySelector('#noOfPro');

decBtn.forEach((value, index) => {
  value.addEventListener("click", () => {
    if (Number(qty[index].innerHTML) !== 1) {
      qty[index].innerHTML = `${Number(qty[index].innerHTML) - 1}`;
      const sNum = Number(sTotal.innerHTML.replace(/[₹,]/g, ""));
      const fNum = Number(fPrice[index].innerHTML.replace(/[₹,]/g, ""));
      const subNum = sNum - fNum;
      sTotal.innerHTML = subNum.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
      const lNum = Number(lPrice[index].innerHTML.replace(/[₹,]/g, ""));
      let dNum = Number(dPrice.innerHTML.replace(/[-,]/g, ""));
      dNum = dNum - (fNum - lNum);
      if (dNum === 0) {
        dPrice.innerHTML = `0`;
      } else {
        dNum = dNum.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        });
        dPrice.innerHTML = `${dNum.replace(/[₹]/g, "-")}`;
      }
      let tNum = Number(tPrice.innerHTML.replace(/[₹,]/g, ""));
      tNum = tNum - lNum;
      tPrice.innerHTML = tNum.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
      noOfPro.setAttribute('value', `${Number(qty[index].innerHTML)}`);
    }
  });
});

incBtn.forEach((value, index) => {
  value.addEventListener("click", () => {
    qty[index].innerHTML = `${Number(qty[index].innerHTML) + 1}`;
    const sNum = Number(sTotal.innerHTML.replace(/[₹,]/g, ""));
    const fNum = Number(fPrice[index].innerHTML.replace(/[₹,]/g, ""));
    const subNum = sNum + fNum;
    sTotal.innerHTML = subNum.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
    const lNum = Number(lPrice[index].innerHTML.replace(/[₹,]/g, ""));
    let dNum = Number(dPrice.innerHTML.replace(/[-,]/g, ""));
    dNum = dNum + (fNum - lNum);
    dNum = dNum.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
    dPrice.innerHTML = 0;
    dPrice.innerHTML = `${dNum.replace(/[₹]/g, "-")}`;
    let tNum = Number(tPrice.innerHTML.replace(/[₹,]/g, ""));
    tNum = tNum + lNum;
    tPrice.innerHTML = tNum.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
    noOfPro.setAttribute('value', `${Number(qty[index].innerHTML)}`);
  });
});
