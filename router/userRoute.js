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

router.get("/",login)
      .get("/home",home)
      .post("/home",loginPost)
      .get("/signup",signup)
      .post("/email",signupPost)
      .get("/email",emailVerify)
      .post("/otp",emailVerifyPost)
      .get("/otp",otp)
      .post("/login",otpPost)
      .get("/forgot",forgotPassword)
      .post("/",forgotPasswordPost)



module.exports=router

