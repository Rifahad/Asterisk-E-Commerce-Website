const UserModel = require("../model/registerModel");
require("dotenv").config();



module.exports = {
  signup: (req, res) => {
    res.render("registerNewAccount");
  },
  signupPost: async (req, res) => {
    console.log(req.body);
    const userStore = await UserModel.create(req.body);
    const { phoneNumber } = req.body;
    req.session.phone = phoneNumber;
    
    res.redirect("/email");
  },

  emailVerify: (req, res) => {
    res.render("emailVerify");
  },  
  emailVerifyPost: async (req, res) => {
    let { email } = req.body;
    let phone = req.session.phone;
    console.log("Phone Number from Session:", phone);

    const emailUpdate = await UserModel.findOneAndUpdate(
      { phoneNumber: phone },
      { $set: { email: email } },
      { new: true }
      );
      const mailer=require("../utility/nodemailer")
    res.redirect("/otp");
  },

  otp: (req, res) => {
    res.render("verifyOtp");
  },

  otpPost: (req, res) => {
    const{otp}=req.body
    if (true) {
      res.redirect("/"); 
    }else{
      res.redirect("/otp")  
    }
    console.log(req.body);
  },

  forgotPassword: (req, res) => {
    res.render("forgotPassword");
  },

  forgotPasswordPost: (req, res) => {

  },

  login: (req, res) => {
    res.render("userLogin");
  },
  loginPost: (req, res) => {
    res.redirect("/home");
  },
  home:(req, res) => {
    res.render("userHomePage")
  },  
  account: (req, res) => {

  },
  category: (req, res) => {

  },
  detailedProduct: (req, res) => {

  },

  profile: (req, res) => {

  },
  profileEdit: (req, res) => {

  },
  wishlist: (req, res) => {

  },
  wishlistEdit: (req, res) => {

  },
  cart: (req, res) => {

  },
  cartPost: (req, res) => {

  },
  cartEdit: (req, res) => {

  },
  addToCart: (req, res) => {

  },
  removeFromCart: (req, res) => {

  },
  placeOrder: (req, res) => {

  },
  myOrder: (req, res) => {

  },
  shippingAddress: (req, res) => {

  },
  shippingAddressPost: (req, res) => {

  },
  orderDetails: (req, res) => {

  },
  search: (req, res) => {

  },
  logout: (req, res) => {
    req.session.destroy();
  },
};
