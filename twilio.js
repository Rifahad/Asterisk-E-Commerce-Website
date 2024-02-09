const accountSid = "AC887bfd3c8b271d5fd5478ffb6d2670ba";
const authToken = "511e25b3417f438ae59261e1cced34cc";  
const verifySid = "VA10cf6c351287442f7e11d2d919e18d63";
const client = require("twilio")(accountSid,authToken);


const express=require("express")
const app=express()


const number=8606790330

async function  name() {
    verification=await client.verify.v2.services(verifySid)
    .verifications.create({
        to:`+91${number}`,
        channel:"call"
    })

}
name()

//  const verificationCheck=await client.verify.v2
// .services(verifySid)
// .verificationChecks.create({to:`+91${number}`,code:req.body.otp})

// if (verificationCheck.status=="approved") {
    
// }else{
//     res.send("Invalid OTP")
// }