const userModel=require('../model/register')

module.exports={
    userProfile:async (req,res)=>{
        const userid=req.session.userId
        if(userid){
            const user=await userModel.findById(userid)
            console.log(user)
            res.render('user/userProfile',{user})
        }else{
            res.redirect('/')
        }
    },
}