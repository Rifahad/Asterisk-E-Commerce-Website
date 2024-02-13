const express = require("express");
const router = express.Router();
const generateMail = require("../utility/nodemailer");
const validating = require("../middleware/validateRegistration");

const {
    home,
} = require("../controller/userController");

const auth = require("../controller/authController");


router
    .get("/", auth.login)
    .post("/home", auth.loginPost)

    .get("/signup", auth.signup)
    .post("/email", validating, auth.signupPost)

    .get("/email", auth.emailVerify)
    .post("/otp", generateMail, auth.emailVerifyPost)

    .get("/otp", auth.otp)
    .post("/login", auth.otpPost)

    .get("/forgot", auth.forgotPassword)
    .post("/", auth.forgotPasswordPost)

    .get("/home",home);

module.exports = router;
