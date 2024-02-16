const mongoose=require("mongoose")

const categoryDetails=new mongoose.Schema({
    categoryImage: String,
    category:String,
    subCategory:Array,
})

module.exports=mongoose.model("category",categoryDetails)