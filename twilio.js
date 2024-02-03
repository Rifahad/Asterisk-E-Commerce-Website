const accountSid = "AC887bfd3c8b271d5fd5478ffb6d2670ba";
const authToken = "94bc40e4c837f76ef6f9c57e68d5e4f7";
const verifySid = "VA10cf6c351287442f7e11d2d919e18d63";
const client = require("twilio")(accountSid, authToken);


const express=require("express")
const app=express()


const number=8606790330

async function  name(params) {
    verification=await client.verify.v2.services(verifySid)
    .verifications.create({
        to:`+91${number}`,
        channel:"whatsapp"
    })

}

name()


// const verificationCheck=await client.verify.v2
// .services(verifySid)
// .verificationChecks.create({to:`+91${number}`,code:req.body.otp})

// if (verificationCheck.status=="approved") {
    
// }else{
//     res.send("Invalid OTP")
// }