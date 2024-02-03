const mongoose=require("mongoose")

const productDetails=new mongoose.Schema({
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
    productImage:String,
})

module.exports=mongoose.model("Products",productDetails)