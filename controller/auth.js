const UserModel = require("../model/register");
require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = {
  // admin authentication
  registerAccount: (req, res) => {},
  registerAccountPost: (req, res) => {},
  loginAdmin: (req, res) => {},
  loginAdminPost: (req, res) => {},

  //user authentication

  signup: (req, res) => {
    res.render("user/registerNewAccount");
  },
  signupPost: async (req, res) => {
    console.log(req.body);
    const userStore = await UserModel.create(req.body);
    const { phoneNumber } = req.body;
    req.session.phone = phoneNumber;
    res.redirect("/email");
  },

  emailVerify: (req, res) => {
    res.render("user/emailVerify");
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
    res.redirect("/otp");
  },

  otp: (req, res) => {
    res.render("user/verifyOtp");
  },

  otpPost: async (req, res) => {
    const { otp } = req.body;
    const { generatedOtp } = require("../utility/nodemailer");

    if (otp === generatedOtp) {
      let phone = req.session.phone;
      const roleUpdate = await UserModel.findOneAndUpdate(
        { phoneNumber: phone },
        { $set: { otp: true } },
        { new: true }
      );
      res.redirect("/");
    } else {
      res.redirect("/otp");
    }
    // console.log(otp, generatedOtp)
  },

  forgotPassword: (req, res) => {
    res.render("user/forgotPassword");
  },
  forgotPasswordPost: (req, res) => {},
  login: (req, res) => {
    res.render("user/userLogin");
  },

  loginPost: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      req.session.email = email;
      const account = await UserModel.findOne({ email });
      const passwordcheck = await bcrypt.compare(password, account.password);
      if (!account) {
        req.flash("account doesn't exist");
      } else if (
        account.email === email &&
        passwordcheck &&
        account.otp == true
      ) {
        res.status(200).redirect("/home");
      } else {
        res.status(200).redirect("/");
      }
    } catch (error) {
      res.error(error).status(404);
    }
  },
};
