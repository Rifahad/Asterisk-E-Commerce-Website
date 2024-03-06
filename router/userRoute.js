const express = require("express");
const router = express.Router();

const generateMail = require("../utility/nodemailer");
const validating = require("../middleware/validateRegistration");

const user= require("../controller/user");
const auth = require("../controller/auth");
const cart=require('../controller/cart');
const wishlist=require('../controller/wishlist')

router.get("/", auth.login)
    .post("/home", auth.loginPost)

    .get("/signup", auth.signup)
    .post("/email", validating, auth.signupPost)

    .get("/email", auth.emailVerify)
    .post("/otp", generateMail, auth.emailVerifyPost)

    .get("/otp", auth.otp)
    .post("/login", auth.otpPost)

    .get("/forgot", auth.forgotPassword)
    .post("/", auth.forgotPasswordPost)

    .get("/home",user.home)

    .get("/details/:id",user.detailedProduct)

    .get("/wishlist",wishlist.wishlist)
    .get("/wishlist/:id",wishlist.addToWishlist)
    .delete('/wishlistDelete/:id',wishlist.deleteFromWishlist)
    
    .get("/categories/:category",user.category)

    .get("/usersAddToCart",cart.cart) 


module.exports=router;  