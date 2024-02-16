const mongoose=require("mongoose")

const categoryDetails=new mongoose.Schema({
    productImage: String,
    categoryName:String,
    subCategory:Array,
})

module.exports=mongoose.model("category",categoryDetails)