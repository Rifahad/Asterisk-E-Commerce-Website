const userModel=require('../model/register')

module.exports={
    userProfile:async (req,res)=>{
        const userid=req.session.userId
        if(userid){
            const user=await userModel.findById(userid)
            res.render('user/userProfile',{user})
        }else{
            res.redirect('/')
        }
    },
    userOrders:(req,res)=>{
        res.status(200).render('user/userOrderPage')
    }
}