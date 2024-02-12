const express=require("express")
const router=express.Router()

const {
    login,
    loginPost,
    signup,
    signupPost,
    emailVerify,
    emailVerifyPost,
    otp,
    otpPost,
    forgotPassword,
    forgotPasswordPost,
    home
}=require("../controller/userController")

const generateMail=require("../utility/nodemailer")
const validating=require('../middleware/validateRegistration')

router.get("/",login)
      .get("/home",home)
      .post("/home",loginPost)
      .get("/signup",signup)
      .post("/email",validating,signupPost)
      .get("/email",emailVerify)
      .post("/otp",generateMail,emailVerifyPost)
      .get("/otp",otp)
      .post("/login",otpPost)  
      .get("/forgot",forgotPassword)
      .post("/",forgotPasswordPost)



module.exports=router

