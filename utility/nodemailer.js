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

const mailSender= (req,res,next)=>{

  const generatedOtp = otpGenerate()
  module.exports={generatedOtp}
  const email= req.body.email;
  
  const mailOption = {
    from: {
      name: 'Rt-max',
      address: "nodemailertestmail4@gmail.com",
    },
    to: email,
    subject: "OTP from Rt-max Application",
    text: `Your OTP is ${generatedOtp}`,
};
transporter.sendMail(mailOption, (error, info) => {
  if (error) {
    console.log(`Error occurred while sending email: ${error}`);
    return res.status(500).json({ error: 'Failed to send email' });
  }
  console.log("Mail has been sent successfully");
  next();
});


}
module.exports=mailSender;

