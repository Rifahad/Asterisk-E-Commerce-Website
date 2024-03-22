const CouponModel = require("../model/coupon")

module.exports={
    applyCoupon:async (req,res)=>{
        try {
          
            const couponCode = req.body.couponCode
            const amount = req.body.Amount
            const coupon = await CouponModel.findOne({couponName:couponCode})
            const newTotal = amount-amount* parseInt(coupon.couponDiscount)/ 100
            const Total = Math.round(newTotal)
            req.session.totalPrice = Total
  
            res.status(200).json({success:true,Total,discount:coupon.couponDiscount})
          } catch (error) {
            console.log(error);
            
          }
    }
}