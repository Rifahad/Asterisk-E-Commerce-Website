const nodemailer = require("nodemailer");
require("dotenv").config()
const otpGenerate=require("./otpGenerator")


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'nodemailertestmail4@gmail.com',
    pass: 'fnlm fywq zwro elpp',
  },
});

const otp = otpGenerate()

const mailOption = {
  from: {
    name: 'Rt-max',
    address: "nodemailertestmail4@gmail.com",
  },
  to: "rifahadmt202@gmail.com",
  subject: "OTP from Rt-max Application",
  text: `Your OTP is ${otp}`,
};
const sendMail = async (transporter, mailOption) => {
  try {
    await transporter.sendMail(mailOption);
    console.log("Mail has been sent successfully");
  } catch (error) {
    console.log(`Error occurred while sending email: ${error}`);
  }
};

module.exports=sendMail(transporter, mailOption);