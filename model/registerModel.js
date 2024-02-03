const mongoose=require("mongoose")
const { use } = require("../router/userRoute")

const  userSchema = new mongoose.Schema({
    fullName: String,
    phoneNumber:Number,
    password: String,
    confirmPassword: String,
    email:{
        type :String ,
        default:""
    },
    otp:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("registeredData",userSchema)
