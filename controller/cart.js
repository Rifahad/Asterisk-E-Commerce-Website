
const { default: mongoose } = require('mongoose');
const cartModel=require('../model/cart');
const productModel=require('../model/products')
const {ObjectId}=require('mongodb')

module.exports = {
    cart:async (req,res)=>{
        if(req.session.userId){
            const userId=new ObjectId(req.session.userId)
            const cart=await cartModel.findOne({userId:userId}).populate({path:'items.productId',model:'Products'})
            const totalAmount=cart.items.reduce((acc,data)=>{
                let discountAmount=(data.productId.discount * data.productId.price)/100
                let discountedPrice=data.productId.price-discountAmount
                return acc+=discountedPrice * data.quantity
                  
            },0)
            console.log(totalAmount)

            res.status(200).render("user/userCart",{cart:cart || '',total:totalAmount})
        }else{
            res.redirect('/')
        }
    },
    addToCart: async (req,res) => {
        if (req.session.userId) {
            const user = req.session.userId;
            const product = req.params.id;
            const userObjId = new mongoose.Types.ObjectId(user);
            const productObjId = new mongoose.Types.ObjectId(product);
            try {
                let cart = await cartModel.findOne({ userId: userObjId });
                if (!cart) {
                    const newCart = new cartModel({
                        userId: userObjId,
                        items: [{ productId: productObjId, quantity: 1 }]
                    });
                    await newCart.save();
                } else {
                    const productExist = cart.items.find(item =>
                        item.productId?.equals(productObjId)
                    );
    
                    if (!productExist) {
                        cart.items.push({ productId: productObjId, quantity: 1 });
                        await cart.save();
                    }
                }
    
                res.status(200).json({ message: 'Product added' });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    },
    deleteFromCart:async (req,res) => {
        try {
            const id =req.query.id
            const userId = req.session.userId;
            console.log(id)
            await cartModel.updateOne(
              { userId },
              { $pull: { items: { productId: id } } }
            );
            const cart = await cartModel.findOne({ userId });
            let length = cart.items.length;
            res.status(200).json({ success: true, message:"product deleted",length});
          } catch (err) {
            console.log("delete cart error", err);
          }
    },
    quantityUpdate:async (req,res)=>{
        const user=req.session.userId
        const quantity=req.body.qty
        const productId=req.body.productId

        const cart=await cartModel.updateOne(
            {userId:user,'items.productId':productId},
            {$set:{'items.$.quantity':quantity}}
        )
        res.status(200).json({success:true,message:'quantity updated'})
        
        
    },
    


}
