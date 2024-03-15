const addressModel=require('../model/address')
const userModel=require('../model/register')


module.exports={
    addAddress:(req,res)=>{
        if(req.session.userId){
            res.status(200).render('user/addAddress')
        }else{
            res.redirect('/')
        }
    },
    addAddressPost:async (req,res)=>{
       if(req.session.userId){
        const user=req.session.userId
            const add=await addressModel.findOneAndUpdate(
                { userId: user },
                { $push: { address: req.body } },
                { upsert: true, new: true }
              );
          res.status(200).json({message:'Address added successfully'})
       }else{
        res.redirect('/')
       }
    },
    listAddress:async (req,res)=>{
        if(req.session.userId){
            const user=req.session.userId
            const addresses=await addressModel.findOne({userId:user})
            const userDetails=await userModel.findById(user)
            const username=userDetails
            res.status(200).render('user/editAddress',{data:addresses || '',userName:username})
        }else{
            res.redirect('/')
        }
    },
    deleteAddress:async (req,res)=>{
        console.log('dhkdjknfdkjlk')
        const user=req.session.userId
        const addressId=req.params.addressId
        try{
            const deleteAddress= await addressModel.findOneAndUpdate(
                { userId: user },
                { $pull: { address:{_id:addressId}} },
                { upsert: true, new: true }
              );
            res.status(200).json({message:'ok'})
        }catch(err){
            console.log(err)
        }
    }
    

}