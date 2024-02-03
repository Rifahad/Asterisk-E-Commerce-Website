const mongoose=require("mongoose")

const couponDetails=new mongoose.Schema({
    couponName: String,
    couponDiscount: String,
    minOrderAmount: Number,
    maxOrderAmount: Number,
    startingDate:Date,
    endingDate: Date,
})

module.exports=mongoose.model("coupens",couponDetails)