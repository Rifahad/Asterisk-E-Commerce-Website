const express=require("express")
const router=express.Router()
const multer = require('multer')
const storage=require("../middleware/multer")
const upload = multer({ storage })



const admin=require("../controller/admin")

const auth=require("../controller/auth")
const view=require("../controller/adminViews")

    
router.get("/register",auth.registerAccount)
      .post("/login-admin",auth.registerAccountPost)

      .get("login-admin",auth.loginAdmin)
      .post("/dashboard",auth.loginAdminPost)

      .get("/dashboard",view.dashboard)

      .get("/category",view.category)
      .get("/add-category",admin.addCategory)
      .post('/add-category',upload.single('productImage'),admin.addCategoryPost)
      
      .get("/orders",view.orders)

      .get('/products',view.products)
    //   .get('/product/edit/:id',editProduct)
      .delete("/product/delete/:productId",admin.deleteProduct)


      .get("/add-product",admin.addProduct)
      .post("/add-product",upload.single('productImage'),admin.addProductPost)

      .get("/banner" , view.banner)
      .get("/add-banner",admin.addBanner)
      .post("/add-banner",upload.single('productImage'),admin.addBannerPost)
      .delete("/banner/delete/:bannerId",admin.deleteBanner)

      .get("/coupon",view.coupon)
      .get("/add-coupon",admin.addCoupon)
      .post("/add-coupon",upload.single('productImage'),admin.addCouponPost)

      .get("/users",view.users)

      .get("/logout",admin.logout)

module.exports=router



