const mongoose=require( 'mongoose');

const cartSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    items:[
        {
            productId:{
                type:mongoose.Types.ObjectId,
                ref: "Products",
                required:true
            },
            quantity:{
                type:Number,
                required: true
            }
        }
    ]
});


module.exports=mongoose.model( "Cart",cartSchema);
//we are creating a model of the name