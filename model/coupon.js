const mongoose=require("mongoose")

const couponDetails=new mongoose.Schema({
    couponName: String,
    couponDiscount: Number,
    minOrderAmount: Number,
    maxOrderAmount:Number,
    startingDate:Date,
    endingDate: Date,
})

module.exports=mongoose.model("coupons",couponDetails)