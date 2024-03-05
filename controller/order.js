
const cartModel=require('../model/cart');
const productModel=require('../model/products')

module.exports = {
    cart:(req,res)=>{
        if(req.session.userId){
            res.render("user/userCart").status(200)
        }else{
            res.redirect('/')
        }
    },
    addToCart:async (req,res)=>{
        const user=req.session.userId;
        const  productId=req.params.productId;

        const product=await productModel.findById(productId);
        const cart=await cartModel.findById(user)
        if(cart){
            
        }


    }
}