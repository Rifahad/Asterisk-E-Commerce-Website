const addressModel=require('../model/address')
const userModel=require('../model/register')
const cartModel=require('../model/cart');
const productModel=require('../model/products')

const {ObjectId}=require('mongodb')

module.exports={
    cartCheckOut:async (req,res)=>{
        if(req.session.userId){
            const userId=new ObjectId(req.session.userId)
            const cart=await cartModel.findOne({userId:userId}).populate({path:'items.productId',model:'Products'})
            const totalAmount=cart.items.reduce((acc,data)=>{
                let discountAmount=(data.productId.discount * data.productId.price)/100
                let discountedPrice=data.productId.price-discountAmount
                return acc+=discountedPrice * data.quantity    
            },0)
            const addresses=await addressModel.findOne({userId:userId})
            const userDetails=await userModel.findById(userId)
            const username=userDetails
            console.log(totalAmount)
            res.status(200).render('user/userPayment',{total:totalAmount, data:addresses || '', userName:username})
        }else{
            res.redirect('/')
        }
    },

    buyNow:async (req,res)=>{
        try {
            const productId=req.params.id;
            console.log(productId)
            const product=await productModel.find({_id:productId})
            res.status(200).render('user/userBuyNow',{product})
        } catch (error) {
            console.log(error)
        }
    }
}
