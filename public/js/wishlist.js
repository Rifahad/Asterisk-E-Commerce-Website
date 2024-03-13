const btn = document.querySelector(".wishlist");
function wishlist(event, id) {
  event.preventDefault();
  axios.get("/wishlist/" + id)
  .then((res) => res.data)
  .then((data) => {
    if (data.success) {
        if (btn.style.color == "red") {
          btn.style.color = "black";
        } else {
          btn.style.color = "red";
        }
      } 
    })
    .catch((error) => {
      console.log(error);
    });
}
