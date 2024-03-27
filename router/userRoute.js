const express = require("express");
const router = express.Router();

const generateMail = require("../utility/nodemailer");
const validating = require("../middleware/validateRegistration");

const user= require("../controller/user");
const auth = require("../controller/auth");
const cart=require('../controller/cart');
const wishlist=require('../controller/wishlist')
const profile=require('../controller/profile')
const address=require('../controller/addressController')
const payment=require('../controller/paymentController')
const coupon=require('../controller/couponController')

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
    .get('/userOrders',profile.userOrders)

    .get("/details/:id",user.detailedProduct)

    .get("/wishlist",wishlist.wishlist)
    .get("/wishlist/:id",wishlist.addToWishlist)
    .delete('/wishlistDelete/:id',wishlist.deleteFromWishlist)
    
    .get("/categories/:category",user.category)

    .get("/usersAddToCart",cart.cart)
    .get('/userCartNow/:id',cart.addToCart)
    .delete('/userCartDelete',cart.deleteFromCart)
    .post('/quantityUpdate',cart.quantityUpdate)

    .get('/userCartCheckOut',payment.checkOutGET)
    .post('/usersCheckout',payment.checkOutPOST)
    

    .get('/userAccount',profile.userProfile)
    .get('/addAddress',address.addAddress)
    .post('/addAddress',address.addAddressPost)
    .get('/userEditAddress',address.listAddress)
    .delete('/deleteAddress/:addressId',address.deleteAddress)

    .get('/showAllproducts',user.searchingGet)
    .get('/sort',user.sort)
    .post('/userFliterByPrice',user.filter)

    .get('/userProductRate/:id',user.userReviewGet)
    .post('/review/:id',user.userReviewPost)

    // .post('/applyCoupon',payment.applyCoupon)

    .get('/success',payment.successPage)



     


module.exports=router;