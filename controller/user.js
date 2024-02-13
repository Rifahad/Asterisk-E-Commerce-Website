const UserModel = require("../model/register");
require("dotenv").config();
const bcrypt=require("bcrypt")



module.exports = {
  home:(req, res) => {
    res.render("user/userHomePage")
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
