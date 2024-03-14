const cartBtn=document.querySelector(`.cartBtn`);
    async function addToCart(event,id) {
    event.preventDefault()
    if(cartBtn.innerHTML=="add to cart"){
        axios.get('/userCartNow/'+id)
        .then((response)=>{
            if(response.status==200){
                cartBtn.innerHTML='Go to cart'
            }
        })
    }else{
        window.location.href='/usersAddToCart'
    }
}


