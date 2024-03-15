const mongoose=require('mongoose')

const addressSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    address:[{
        locality:String,
        country:String,
        district:String,
        state:String,
        hNo:Number,
        pin:Number,
    }]
})

module.exports=mongoose.model('address',addressSchema)