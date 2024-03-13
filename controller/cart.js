
const { default: mongoose } = require('mongoose');
const cartModel=require('../model/cart');
const productModel=require('../model/products')
const {ObjectId}=require('mongodb')

module.exports = {
    cart:async (req,res)=>{
        if(req.session.userId){
            const userId=new ObjectId(req.session.userId)
            const cart=await cartModel.findOne({userId:userId}).populate({path:'items.productId',model:'Products'})
            console.log(cart)
            res.status(200).render("user/userCart",{cart:cart || ''})
        }else{
            res.redirect('/')
        }
    },
    addToCart: async (req, res) => {
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
                    // Check if the product already exists in the cart
                    const productExist = cart.items.find(item =>
                        item.productId.equals(productObjId)
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
    }
    












}
