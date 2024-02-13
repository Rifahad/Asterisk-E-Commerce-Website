const mongoose=require("mongoose")

const categoryDetails=new mongoose.Schema({
    productImage: String,
    categoryName:String,
})

module.exports=mongoose.model("category",categoryDetails)