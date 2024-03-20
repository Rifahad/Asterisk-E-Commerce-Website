const mongoose=require("mongoose")

const couponDetails=new mongoose.Schema({
    couponName: String,
    couponDiscount: Number,
    minOrderAmount: Number,
    startingDate:Date,
    endingDate: Date,
})

module.exports=mongoose.model("coupens",couponDetails)