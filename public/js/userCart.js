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
const dPrice = document.querySelector("#dPrice");
const tPrice = document.querySelector("#tPrice");
const subTotal = document.querySelector("#subTotal");


sub=subTotal.innerHTML.replace('')







function decreaseQuantity(event,productID,price,stock) {
  event.preventDefault()
  console.log(productID);
  const quantityShowArea = document.querySelector(`.qtyOne${productID}`);
  if(quantityShowArea.innerHTML>1){
    quantityShowArea.innerHTML=+quantityShowArea.innerHTML -1;
    const quantityValue=parseInt(quantityShowArea.innerHTML)
    console.log(quantityValue)
    const response=axios.post('/quantityUpdate', {
      productId:productID,
      qty:quantityValue,
    });
    if(response.status==200){
     
    }

  }else{
    removeFromCart(productID)
  }
}



function increaseQuantity(event,productID,price,stock) {
  event.preventDefault()
  console.log(productID);
  const quantityShowArea = document.querySelector(`.qtyOne${productID}`);
    quantityShowArea.innerHTML=+quantityShowArea.innerHTML +1;
    const quantityValue=parseInt(quantityShowArea.innerHTML)
    console.log(quantityValue)
    const response=axios.post('/quantityUpdate', {
      productId:productID,
      qty:quantityValue,
    });
}


