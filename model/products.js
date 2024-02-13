const mongoose=require("mongoose")

const productDetails=new mongoose.Schema({
    productImage:String,
    productName: String,
    price: Number,
    discount: String,
    stock: Number,
    category: String,
    subCategory: String,
    deliveryDate: Date,
    colour: String,
    size: String,
    quantity: Number,
    description: String,
})

module.exports=mongoose.model("Products",productDetails)