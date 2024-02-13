const productDetails=require("../model/productsDetailsModel")
const banner=require("../model/bannerModel")
const couponDetails=require("../model/coupon")
const categoryDetails=require("../model/categoryModel")

module.exports={
    dashboard:(req,res)=>{
        res.status(200).render("dashboard")
    },
    orders:(req,res)=>{
        res.status(200).render("orders")
    },
    products: async (req, res) => {
        try {
            const result = await productDetails.find();
            console.log(result);
            res.status(200).render("products", { products: result });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).send("Error fetching products");
        }
    },
    
    addProduct:(req,res)=>{
        res.status(200).render("addProducts")
    },
    addProductPost:async (req,res)=>{
        const productimg = req.file ? req.file.filename : 'no image';
        try {
            await productDetails.create({...req.body, productImage: productimg});
            res.redirect("/add-product");
        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding product");
        }
    },
    deleteProduct:async(req,res)=>{
        try {
            const id=req.params.productId
            const product= await productDetails.findById(id)
            await productDetails.findByIdAndDelete(id);
            res.redirect("/products")
        } catch (error) {
            res.status(500).send("Error deleting product");

        }
    },
    banner:async (req,res)=>{
        try {
            const result = await banner.find();
            console.log(result);
            res.status(200).render("bannar", { products: result });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).send("Error fetching products");
        }
    },    
    addBanner:(req,res)=>{
        res.status(200).render("addBanner")
    },
    addBannerPost:async (req,res)=>{
        console.log(req.body)
        const productimg = req.file ? req.file.filename : 'no image';
        try {
            await banner.create({...req.body, productImage: productimg});
            res.redirect("/add-banner");
        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding product");
        }
    },
    coupon:(req,res)=>{
        res.status(200).render("coupon")

    },
    addCoupon:(req,res)=>{
        res.status(200).render("addCoupon")
    },
    addCouponPost:async (req,res)=>{
        console.log(req.body);
        
        await couponDetails.create(req.body)
    },
    users:(req, res) => {
        res.status(200).render("users")
    },
    category:(req,res)=>{
        res.status(200).render("category")
    },
    addCategory:(req,res)=> {
        res.status(200).render("addCategory")
    },
    addCategoryPost:async (req,res)=>{
        await categoryDetails.create(req.body)
    },
    logout:(req,res)=>{
        req.session.destroy();
    }
}