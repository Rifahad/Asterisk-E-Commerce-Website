const mongoose=require("mongoose")

const bannerDetails=new mongoose.Schema({
    productImage: String,
    bannerProduct: String,
    bannerHeading: String,
    bannerDescription: String,
    buttonLink: String,
    startingDate: Date,
    endingDate: Date,
})

module.exports=mongoose.model("bannerData",bannerDetails)