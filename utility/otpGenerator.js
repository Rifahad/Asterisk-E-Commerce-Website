const otpGenerator = require('otp-generator')

const otpGenerate=()=>{
    const OTP=otpGenerator.generate(6, {
         upperCaseAlphabets: false,
         lowerCaseAlphabets:false,
        specialChars: false,
    });
    return OTP
}
module.exports=otpGenerate