const addressModel=require('../model/address')
const userModel=require('../model/register')
const cartModel=require('../model/cart');
const productModel=require('../model/products')
const OrderModel=require('../model/order')

const {ObjectId}=require('mongodb')
const Razorpay = require('razorpay')

const Razorpay_key = process.env.RAZKEY
const Razorpay_secret_key = process.env.RAZSECRET

var instance = new Razorpay({
  key_id:Razorpay_key,
  key_secret:Razorpay_secret_key

})

module.exports={
    checkOutGET:async (req,res)=>{
        if(req.session.userId){
            const userId=new ObjectId(req.session.userId)
            let productId=req.query.id
            const addresses=await addressModel.findOne({userId:userId})
            const username=await userModel.findById(userId)
            let totalAmount=0;
            if(!productId){
                const cart=await cartModel.findOne({userId:userId}).populate({path:'items.productId',model:'Products'})
                totalAmount=cart.items.reduce((acc,data)=>{
                    let discountAmount=(data.productId.discount * data.productId.price)/100
                    let discountedPrice=data.productId.price-discountAmount
                    return acc+=discountedPrice * data.quantity    
                },0)
                console.log(totalAmount)
            }else{
                const productDetails = await productModel.find({
                  _id: productId,
                });
                if (productDetails.length > 0) {
                  let discountAmount =(productDetails[0].discount * productDetails[0].price) /100;
                  totalAmount = productDetails[0].price - discountAmount;
                } else {
                  console.log("No product found with the given ID");
                }
            }
            req.session.totalAmount=totalAmount
            res.status(200).render('user/userPayment',{total:totalAmount, data:addresses || '', userName:username})
        }else{
            res.redirect('/')
        }
    },

    checkOutPOST:async(req,res)=>{
        try {
            if(req.session.userId)
            {   
                const {phone,paymentAddress,paymentMethod} = req.body
                if(paymentMethod =='COD'){   
                    res.status(200).json({success:true, COD:true})
                }else{
                    const options = {
                        amount: req.session.totalAmount * 100, // amount in the smallest currency unit
                        currency: "INR",
                      };
                       const razorpayOrder = await instance.orders.create(options);
                       res.status(200).json({success:true, razorpayOrder });
                }

            }else{
                res.redirect('/')
            }


            
        } catch (error) {
            console.log('error at checkout post',error)
        }
    },

    successPage:(req,res)=>{
        res.status(200).render('user/orderPlacedSuccessfull')
    }
    

}
