const productDetails=require("../model/productsDetailsModel")
const banner=require("../model/bannerModel")
const couponDetails=require("../model/coupon")
const categoryDetails=require("../model/categoryModel")

module.exports={
    registerAccount:(req,res)=>{

    },
    registerAccountPost:(req,res)=>{

    },
    loginAdmin:(req,res)=>{

    },
    loginAdminPost:(req,res)=>{

    },
    dashboard:(req,res)=>{
        res.render("dashboard")
    },
    orders:(req,res)=>{

    },
    products:(req,res)=>{

    },
    addProduct:(req,res)=>{
        res.render("addProducts")
    },
    addProductPost:async (req,res)=>{
        console.log(req.file.filename);
        await productDetails.create(req.body)
        res.redirect("/add-product")

    },
    banner:(req,res)=>{

    },    
    addBanner:(req,res)=>{
        res.render("addBanner")
    },
    addBannerPost:async (req,res)=>{
        console.log(req.body)
        await  banner.create(req.body)  
    },
    coupon:(req,res)=>{

    },
    addCoupon:(req,res)=>{
        res.render("addCoupon")
    },
    addCouponPost:async (req,res)=>{
        console.log(req.body);
        await couponDetails.create(req.body)
    },
    users:(req, res) => {

    },
    category:(req,res)=>{
        
    },
    addCategory:(req,res)=> {
        res.render("addCategory")
    },
    addCategoryPost:async (req,res)=>{
        console.log(req.body)
        await categoryDetails.create(req.body)
    },
    logout:(req,res)=>{
        req.session.destroy();
    }
}